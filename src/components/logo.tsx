import logo from "@/assets/logo.svg";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-3 ">
      <img src={logo} alt="logo chirpify" className="w-24" />
      <h1 className="font-bold uppercase text-4xl text-primary">Chirpify</h1>
    </div>
  );
}
