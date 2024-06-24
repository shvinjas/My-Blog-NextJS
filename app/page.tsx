// "use client"
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function Home() {

// const [posts,setPosts]=useState([]);

// useEffect(()=>{

// fetch(process.env.NEXT_PUBLIC_API_URL+"/posts")
// .then((response)=>response.json())
// .then((response)=>setPosts(response))

// },[])

//   return (
//     <section className="min-h-screen flex flex-col">
//       <main className="container  mx-auto px-4 py-6  flex-grow">
//         <h1 className="text-3xl sm:text-7xl font-bold py-5">Welcome to our Blog</h1>
//         <p className="font-normal leading-normal text-lg mb-6">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quis
//           corporis modi, quibusdam quia tempora officiis provident ex fuga
//           doloribus est maiores quisquam quod odio atque reprehenderit dolor
//           optio eum accusantium repellat sunt aperiam debitis necessitatibus
//           consectetur! Harum dignissimos nemo facilis totam laborum sed
//           aspernatur? Doloribus, consequatur excepturi corrupti, doloremque
//           labore aut odio quidem rem dolor amet fugiat molestiae? Blanditiis
//           cumque a laudantium distinctio, consequatur illum quia, sequi eius
//           velit inventore, accusamus ab laboriosam expedita. Molestiae quam
//           dolorem, libero quisquam, minima alias eligendi mollitia, ratione
//           officiis quos recusandae quo repudiandae suscipit. Eligendi facilis
//           repudiandae iste voluptatum, nulla debitis voluptatem soluta?
//         </p>

//         <div className="flex justify-end  mb-10 gap-2  border ml-2">
//           <input
//             type="text"
//             placeholder="Search ..."
//             className="px-4 py-2 border w-52 border-gray-300 rounded-md custom-placeholder "
//           ></input>
//           <button className="bg-blue-500 px-5 rounded-lg text-white text-2xl">
//             Search
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-5  ">
// {posts.map((post)=>(

//   <Link href={"/post/"+post._id}>

//           <div className="border border-gray-500 group p-5 ">
//             <img
//               className="pb-4 w-full h-auto "
//               src={post.image} alt='fiji'
//             ></img>
//             <div className="">
//               <h1 className="text-2xl font-bold py-3">{post.title}</h1>
//               <p>
//                 {post.short_description}
//               </p>
//             </div>
//           </div>
//           </Link>

// ))}

//         </div>
//       </main>
//     </section>
//   );
// }

"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const inputRef = useRef("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, []);

  const searchPost = (e) => {
    if (e.type == "keydown" && e.key !== "Enter") {
      return;
    }

    setSearch(true);
    // setTimeout(() => {
    fetch(
      process.env.NEXT_PUBLIC_API_URL + "/posts?q=" + inputRef.current.value
    )
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .finally(() => setSearch(false));
    // }, 2000)
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4 lg:mb-6">Welcome to My Blog</h2>
        <p className="lg:mb-2">
          Hi! I’m Jo. I share travellers how to travel the world safely — and I’m
          here to help you have the best trip ever. I love travelling and started exploring  the
          world alone in 2010. A decade later, I’ve traveled to 83 countries and
          all seven continents! .
          Whether you need guidance for your first solo trip or you’re a
          seasoned traveler looking for destination inspiration, you’ve come to
          the right place!
        </p>
      </main>
      <div className="flex justify-end px-4 lg:mb-6">
        <input
          onKeyDown={searchPost}
          disabled={search}
          ref={inputRef}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button
          onClick={searchPost}
          disabled={search}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
        >
          {search ? "..." : "Search"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link href={"/post/" + post._id}>
            <div className="border border-gray-200 p-4">
              <img
                className="w-full h-48 object-cover mb-4"
                src={post.image}
                alt="Post Image"
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
        {!posts.length > 0 && inputRef.current.value && (
          <p>
            No posts available for this query: <b>{inputRef.current.value}</b>
          </p>
        )}
      </div>
    </>
  );
}
