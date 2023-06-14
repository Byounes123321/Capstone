import {useState, useEffect} from "react";


export default function UselessFact() {


    const [randomFact, setRandomFact] = useState("");
    const [factSource, setFactSource] = useState("");

    

    useEffect(() => {
        const getFact = async () => {
            let response = await fetch(
                "https://uselessfacts.jsph.pl/api/v2/facts/random"
            );
            let data = await response.json();
            // console.log(data);
            setRandomFact(data.text);
            setFactSource(data.source_url);
        }
        getFact();

        // Set up an interval to fetch data every 5 seconds (adjust as needed)
        const interval = setInterval(getFact, 3000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);

    }, []);

    //conditional rendering (only if the factSource exists it will be displayed)
    let source = <div></div>;
    if (factSource) {
        source = <div class="source"><em>{factSource}</em></div>
    }

    return(
        <div>
            <h2>Today's random useless fact</h2>
            <div>
                {randomFact}
            </div>
            <div>
                {source}
            </div>
        </div>
    );
};