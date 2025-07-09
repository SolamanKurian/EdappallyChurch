export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Edappally Church
          <br />
          <span className="text-[8px] block mt-1">
            Developed by <a href="https://www.dexqbit.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">Dexqbit Solutions Pvt Ltd</a>
          </span>
        </div>
      </div>
    </footer>
  );
} 