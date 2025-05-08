import logo from "../assets/logo.svg";

const Header = () => {
    return (
        <div className="flex items-center justify-start h-16 text-white font-bold header-gradient px-5">
            <img src={logo} alt="logo" className="w-7 h-7" />
            <h1 className="text-[clamp(20px,4vw,40px)] font-bold ml-[clamp(16px,3vw,32px)]">
                Lottery Simulator
            </h1>
        </div>
    );
};

export default Header;
