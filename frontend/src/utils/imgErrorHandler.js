const errorHandler = () => {
  const delay = setTimeout(() => {
    const imgElement = document.querySelector(".FilteredItemPicOf");
    imgElement.src = imgElement.getAttribute("data-src") + "?timestamp=" + new Date().getTime();
    console.log(imgElement.src);
  }, 70000);
  return () => clearTimeout(delay);
};
export default errorHandler;
