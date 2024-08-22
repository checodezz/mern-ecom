export const imageToBase64 = async (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  const data = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  return data;
};

export const displayINRCurrency = (num) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
  })

  return formatter.format(num)
}