export default function AnimeButton({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="relative px-6 py-2 font-anime text-white bg-anime-purple rounded-lg 
               transform transition-all duration-200 hover:scale-105 
               before:content-[''] before:absolute before:-inset-1 before:border-2 
               before:border-anime-pink before:rounded-lg before:opacity-0 
               hover:before:opacity-100 before:transition-all before:duration-300
               active:scale-95"
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}