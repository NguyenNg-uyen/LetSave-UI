const imagesLink = `https://i.ibb.co/879sWRw/You-Tube-Play-Button-48px.png
    https://i.ibb.co/z7K5TvY/workstation-48px.png
    https://i.ibb.co/7ypnKbs/traveler-48px.png
    https://i.ibb.co/Mcrxt30/student-male-48px.png
    https://i.ibb.co/zZ85M67/soccer-ball-48px.png
    https://i.ibb.co/VNwX1vh/sell-stock-48px.png
    https://i.ibb.co/Rj3Jc7w/romance-48px.png
    https://i.ibb.co/09zns0N/pill-48px.png
    https://i.ibb.co/Kqt7jnX/pets-48px.png
    https://i.ibb.co/K7HmCSy/motorcycle-48px.png
    https://i.ibb.co/6BV5jkK/love-48px.png
    https://i.ibb.co/DYmKVW9/listening-to-music-on-headphones-48px.png
    https://i.ibb.co/M6kBngC/light-on-48px.png
    https://i.ibb.co/Ks31Tb7/laptop-48px.png
    https://i.ibb.co/hsbkh2Q/internet-48px.png
    https://i.ibb.co/ZHRpXV2/house-48px.png
    https://i.ibb.co/9gssnM6/hospital-3-48px.png
    https://i.ibb.co/0rqthPZ/hamburger-48px.png
    https://i.ibb.co/n3wL2tM/green-dress-48px.png
    https://i.ibb.co/9cMwcRm/gas-station-48px.png
    https://i.ibb.co/WFCSy5g/food-48px.png
    https://i.ibb.co/WkHDW8M/diabetes-48px.png
    https://i.ibb.co/1z8Y4Bx/cat-head-48px.png
    https://i.ibb.co/94Y6gqR/car-48px.png
    https://i.ibb.co/mDHRGZ0/cafe-48px.png
    https://i.ibb.co/SXVXgnv/bookcase-48px.png
    https://i.ibb.co/G3jgJK1/bank-48px.png
    https://i.ibb.co/ByGWWQF/android-48px.png
    https://i.ibb.co/CVG2YHH/administrator-male-48px.png
    https://i.ibb.co/fn6jLV5/airplane-mode-on-48px.png`;
const listIconData = imagesLink.split("\n");
const iconData = [];
listIconData.forEach((item) => {
  iconData.push({ link: item.trim() });
});
export default iconData;
