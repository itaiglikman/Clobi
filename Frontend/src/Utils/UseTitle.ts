import { useEffect } from "react";

function useTitle(title: string): void {
    useEffect(() => {
        document.title = "Clobi | " + title;
    }, [])
}

export default useTitle;