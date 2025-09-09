export default function Upload() {
  return (
    <>
      <div
        className={`fixed w-full h-full bg-[rgba(0,0,0,.5)] 
          top-0 left-0 z-1000`}
      ></div>

      <div
        className="flex flex-col gap-4 mx-auto my-20 fixed inset-0 m-auto z-1100 px-4 py-4 bg-[#ffffff] 
          rounded-2xl shadow-md size-96"
      >
        <h1 className="font-semibold">ファイルを開く</h1>
        <input type="file"></input>
      </div>
    </>
  );
}
