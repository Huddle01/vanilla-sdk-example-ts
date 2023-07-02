"use client";
import Image from "next/image";
import { sayHello, huddleClient } from "vanilla";
import Button from "./components/Button";
import { useEffect, useRef, useState } from "react";
import VideoElem from "./components/VideoElem";

export default function Home() {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<
    Awaited<ReturnType<typeof huddleClient.getPeers>>
  >([]);
  const [tracks, setTracks] = useState<
    Awaited<ReturnType<typeof huddleClient.getPeerTracks>>[]
  >([]);

  // refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (videoStream && videoRef.current)
      videoRef.current.srcObject = videoStream;
  }, [videoStream]);

  useEffect(() => {
    if (audioStream && audioRef.current)
      audioRef.current.srcObject = audioStream;
  }, [audioStream]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Button onClick={sayHello}>SayHello</Button>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="bg-zinc-800 aspect-video rounded-lg overflow-hidden">
          <video ref={videoRef} autoPlay />

          {/* <audio ref={audioRef} autoPlay className="" /> */}
        </div>
        <div className=" flex gap-3">
          {tracks.map((track, i) => (
            <VideoElem key={i} track={track.video} />
          ))}
        </div>
      </div>

      <div className="w-full">
        <div>Room</div>
        <div className="flex gap-3  w-full">
          <Button
            onClick={() => {
              huddleClient.initialize("pSNb4vwvAz7bbzQdVYCpHWHPO-BTV2oz");
            }}
          >
            initialize()
          </Button>
          <Button
            onClick={() => {
              huddleClient.initialize("pSNb4vwvAz7bbzQdVYCpHWHPO-BTV2oz");
              huddleClient.joinLobby("ngo-tmvu-oxw");
            }}
          >
            joinLobby()
          </Button>
          <Button onClick={() => huddleClient.joinRoom()}>joinRoom()</Button>
          <Button onClick={() => huddleClient.leaveLobby()}>
            leaveLobby()
          </Button>
          <Button onClick={() => huddleClient.leaveRoom()}>leaveRoom()</Button>
        </div>

        <div>Audio</div>
        <div className="flex gap-3">
          <Button
            onClick={async () => {
              const stream = await huddleClient.fetchAudioStream();
              setAudioStream(stream);
            }}
          >
            fetchAudioStream()
          </Button>
          <Button
            onClick={() => {
              if (!audioStream) return alert("fetchaudioStream() first");
              huddleClient.produceAudio(audioStream);
            }}
          >
            produceAudio()
          </Button>

          <Button
            onClick={() => {
              huddleClient.stopAudioStream();
            }}
          >
            stopAudioStream()
          </Button>
          <Button
            onClick={() => {
              huddleClient.stopProducingAudio();
            }}
          >
            stopProducingAudio()
          </Button>
        </div>

        <div>Video</div>
        <div className="flex gap-3">
          <Button
            onClick={async () => {
              const stream = await huddleClient.fetchVideoStream();
              setVideoStream(stream);
            }}
          >
            fetchVideoStream()
          </Button>
          <Button
            onClick={() => {
              if (!videoStream) return alert("fetchVideoStream() first");
              huddleClient.produceVideo(videoStream);
            }}
          >
            produceVideo()
          </Button>

          <Button
            onClick={() => {
              huddleClient.stopVideoStream();
            }}
          >
            stopVideoStream()
          </Button>
          <Button
            onClick={() => {
              huddleClient.stopProducingVideo();
            }}
          >
            stopProducingVideo()
          </Button>
        </div>
        <div>Peers</div>
        <Button
          onClick={() => {
            const _peers = huddleClient.getPeers();
            console.log({ _peers });

            setPeers(_peers);
          }}
        >
          getPeers()
        </Button>
        <Button
          onClick={() => {
            const _tracks = peers.map((peer) => {
              console.log({ peer });

              return huddleClient.getPeerTracks(peer.peerId);
            });

            console.log({ _tracks });
            setTracks(_tracks);
          }}
        >
          getPeerTracks()
        </Button>
      </div>
    </main>
  );
}
