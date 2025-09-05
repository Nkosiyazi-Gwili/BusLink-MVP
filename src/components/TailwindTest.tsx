export default function TailwindTest() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Tailwind CSS Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <div className="text-2xl">🔴</div>
          <p className="font-semibold">Red Box</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl">🟢</div>
          <p className="font-semibold">Green Box</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-2xl">🔵</div>
          <p className="font-semibold">Blue Box</p>
        </div>
      </div>

      <div className="text-center">
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">
          Test Button
        </button>
      </div>
    </div>
  );
}