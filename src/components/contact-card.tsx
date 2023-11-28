export function ContactCard() {
  return (
    <div className="flex justify-between h-20 p-3 cursor-pointer hover:bg-accent/50 rounded-lg active:scale-95 transition-all mb-4 select-none">
      <div className="flex items-center gap-3">
        <img
          src="https://github.com/viniciuspra.png"
          alt=""
          className="w-14 h-14 rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">Vinicius Cascaes</h3>
          <p className="text-white/50">How are you?</p>
        </div>
      </div>
      <div className="text-white/50">12m</div>
    </div>
  );
}
