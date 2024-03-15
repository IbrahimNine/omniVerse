const errorHandler = () => {
  const delay = setTimeout(() => {
    const imgElement = document.querySelector(".FilteredItemPic");
    imgElement.src = imgElement.src + "?timestamp=" + new Date().getTime();
  }, 30000);
  return () => clearTimeout(delay);
};
export default errorHandler;
