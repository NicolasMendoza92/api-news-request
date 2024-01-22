
import Layout from "@/components/Layout";
import Link from "next/link";


export default function Home() {

  return (
      <Layout>
          <div className="grid grid-cols-1 items-center text-center gap-3 mx-auto p-20 ">
            <h1 className="text-5xl my-3 font-bold"> Search worldwide news in one page</h1>
            <p className="text-2xl my-3 mx-2"> Search for your favorite topics</p>
            <Link href={'/news'} className="mx-auto bg-blue-600 rounded-lg px-3 py-3 flex gap-1 text-white text-xl">Let's get to it</Link>
          </div>
      </Layout>
  );
}
