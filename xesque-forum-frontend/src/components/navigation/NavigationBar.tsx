export default function NavigationBar() {
  return (
    <div className="bg-green-600 w-full p-4 text-white">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center">
        <div className="my-3">
          <a href="/" className="font-bold">
            Início
          </a>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <a
            href="/login"
            className="bg-transparent hover:bg-green-700 text-green-200 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-4"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-transparent hover:bg-green-700 text-green-200 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            Registre-se
          </a>
        </div>
      </div>
    </div>
  );
}
