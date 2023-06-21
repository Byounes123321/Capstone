import CarMap from "./CarMap";

export default function Body() {
    return (
        <div>
            <header>
                <div id="header_contents">
                    <img id="brickmmoLogo" src="/images/brickmmoLogo.jpg" />
                    <h1>GPS</h1>
                </div>
            </header>
            <div id="carMap">
                <CarMap />
            </div>
            <footer>
                <p>&copy; Copyright BRICKMMO, 2023.</p>
            </footer>
        </div>
        
    )
}