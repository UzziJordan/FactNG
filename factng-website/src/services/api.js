export const getFeaturedProjects = async () => {
  return [
    {
      _id: "1",
      title: "Modern Minimalist Villa",
      category: "Interior",
      location: "Maitama, Abuja",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    },
    {
      _id: "2",
      title: "Luxury Penthouse",
      category: "Interior",
      location: "Ikoyi, Lagos",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498d"
    },
    {
      _id: "3",
      title: "Corporate HQ Facade",
      category: "Exterior",
      location: "Victoria Island, Lagos",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
    },
    {
      _id: "4",
      title: "Boutique Hotel Lobby",
      category: "Commercial",
      location: "Wuse 2, Abuja",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    },
    {
      _id: "5",
      title: "Contemporary Kitchen",
      category: "Renovation",
      location: "Lekki, Lagos",
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77"
    },
    {
      _id: "6",
      title: "Tropical Oasis Garden",
      category: "Exterior",
      location: "Asokoro, Abuja",
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
    }
  ];
};

export const getAllProjects = async () => {
  return await getFeaturedProjects(); // temporary reuse
};


export const getExpartsCard = async () => {
  return [
    {
      _id: "1",
      name: "Oluwaseun Adebayo",
      position: "Founder & CEO",
      image: "https://i.pinimg.com/1200x/1f/c9/6e/1fc96e1619b913eade6eb6533f72cf83.jpg"
    },

    {
      _id: "2",
      name: "Ngozi Eze",
      position: "Lead Interior Designer",
      image: "https://i.pinimg.com/736x/0a/de/79/0ade7978a78e1880decc809bdd382f60.jpg"
    },
    {
      _id: "3",
      name: "Ibrahim Musa",
      position: "Head of Arch",
      image: "https://i.pinimg.com/736x/3c/b2/3f/3cb23f898323838f9f9b0c3e7e2d4437.jpg"
    },
    {
      _id: "4",
      name: "Chick Nwosu",
      position: "Project Manager",
      image: "https://i.pinimg.com/1200x/e1/b4/7e/e1b47ecffa82c317acea1d3cb9a6f836.jpg"
    },
  ];
};

export const getAllExparts = async () => {
  return await getExpartsCard(); // temporary reuse
};