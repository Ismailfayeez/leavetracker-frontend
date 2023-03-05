import { useContext } from "react";

export function useGlobalNavPages(globalNavContext) {
  const { pages, setPages, currentLocation, setCurrentLocation } =
    useContext(globalNavContext);

  const handleForward = (pathName) => {
    if (currentLocation) setPages([...pages, currentLocation]);
    setCurrentLocation(pathName);
  };

  const handleBack = () => {
    if (pages.length) {
      const data = [...pages];
      setCurrentLocation(data[data.length - 1]);
      setPages(data.splice(data.length - 1, 1));
    }
  };

  return [{ handleForward, handleBack }];
}
