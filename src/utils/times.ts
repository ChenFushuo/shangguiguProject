// 获取时间
export const getTime = () => {
  let message = "";
  const hours = new Date().getHours();
  if (hours <= 9) {
    message = "早上";
  } else if (hours > 9 && hours <= 12) {
    message = "上午";
  } else if (hours > 12 && hours <= 15) {
    message = "中午";
  } else if (hours > 15 && hours <= 18) {
    message = "下午";
  } else {
    message = "晚上";
  }
  return message;
};
