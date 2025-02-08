import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getOffers, sendOffer } from "../../api/apiService";

const WebRTC = () => {
  // set up refs
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef();
  const signalServer = useRef();
  const [roomId, setRoomId] = useState("room");
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOffers = async () => {
    try {
      const response = await getOffers();
      setOffers(response.offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call getOffers when the component mounts
  useEffect(() => {
    getAllOffers();
  }, []);

  const setupLocalStream = async () => {
    try {
      // gets video/audio and sets it to the videoref
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      // adds ice candidates and media to connection to send to signaling server
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      localStream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, localStream);
      });

      // sends icecandidate received from stun server
      peerConnection.current.onicecandidate = (ice) => {
        if (ice.candidate) {
          signalServer.current?.send(
            JSON.stringify({ type: "candidate", candidate: ice.candidate })
          );
        }
      };

      // set remote video to track received from other peer
      peerConnection.current.ontrack = (track) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = track.streams[0];
        }
      };
    } catch (error) {
      console.error("Error getting media", error);
    }
  };

  // prepares answer if receives offer message from remote
  const handleRemoteOffer = async (sdp) => {
    if (peerConnection.current?.signalingState !== "stable") return;

    // sets remote sdp and type from offer
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription({ type: "offer", sdp })
    );

    // creates answer and sends it
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    signalServer.current?.send(
      JSON.stringify({
        type: "answer",
        sdp: peerConnection.current?.localDescription?.sdp,
      })
    );
  };

  // receives answer message
  const handleRemoteAnswer = async (sdp) => {
    await peerConnection.current?.setRemoteDescription(
      new RTCSessionDescription({ type: "answer", sdp })
    );
  };

  // receives icecandidate message
  const handleRemoteCandidate = async (candidate) => {
    await peerConnection.current?.addIceCandidate(
      new RTCIceCandidate(candidate)
    );
  };

  // closes connection
  const handleRemoteClose = async () => {
    peerConnection.current?.close();
  };

  const handleInputChange = (event) => {
    setRoomId(event.target.value);
  };

  // create room to join
  const handleCreateRoom = async () => {
    console.log("Created room", roomId);
    signalServer.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/webrtc/${roomId}/`
    );

    // Handle different messages from server
    signalServer.current.onmessage = async (msg) => {
      const message = JSON.parse(msg.data);
      if (message.type === "offer") {
        await handleRemoteOffer(message.sdp);
      } else if (message.type === "answer") {
        await handleRemoteAnswer(message.sdp);
      } else if (message.type === "candidate") {
        await handleRemoteCandidate(message.candidate);
      } else if (message.type === "close") {
        await handleRemoteClose(message.candidate);
      }
    };

    const offer = await sendOffer({ room_name: roomId });
    console.log(offer);

    setupLocalStream();
  };

  // join room
  const handleJoinRoom = async (id) => {
    console.log("joined room", roomId);
    signalServer.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/webrtc/${id}/`
    );

    // Handle different messages from server
    signalServer.current.onmessage = async (msg) => {
      const message = JSON.parse(msg.data);
      if (message.type === "offer") {
        await handleRemoteOffer(message.sdp);
      } else if (message.type === "answer") {
        await handleRemoteAnswer(message.sdp);
      } else if (message.type === "candidate") {
        await handleRemoteCandidate(message.candidate);
      } else if (message.type === "close") {
        await handleRemoteClose(message.candidate);
      }
    };

    setupLocalStream();
  };

  // start call by sending offer message
  const handleCall = async () => {
    alert("Call started.");
    const offer = await peerConnection.current?.createOffer();
    await peerConnection.current?.setLocalDescription(offer);

    signalServer.current?.send(
      JSON.stringify({
        type: "offer",
        sdp: peerConnection.current?.localDescription?.sdp,
      })
    );
  };

  const handleHangUp = () => {
    alert("Call ended.");
    peerConnection.current?.close();

    signalServer.current?.send(
      JSON.stringify({
        type: "close",
        sdp: null,
      })
    );
  };

  return (
    <>
      <Button variant="success" onClick={handleCall}>
        Call
      </Button>
      <input
        className="d-flex align-items-center gap-2"
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={handleInputChange}
      />
      <Button variant="success" onClick={handleCreateRoom}>
        Create Room
      </Button>
      <Button variant="danger" onClick={handleHangUp}>
        Hang Up
      </Button>
      {loading ? (
        <p>Loading offers...</p>
      ) : (
        <div>
          {offers.map((offer) => {
            return (
              <Button key={offer} onClick={handleJoinRoom(offer)}>
                {offer}
              </Button>
            );
          })}
          {offers.length}
        </div>
      )}
      <h1>WebRTC</h1>
      <video ref={localVideoRef} autoPlay playsInline muted width="300" />
      <video ref={remoteVideoRef} autoPlay playsInline width="300" />
    </>
  );
};

export default WebRTC;
