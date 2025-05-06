import Chat from "@/components/chat";
import {Blueprint} from "@/components/tool/blueprint";

export default async function Home() {
  return (
    <>
      <Chat/>
      <Blueprint/>
    </>
  );
}
