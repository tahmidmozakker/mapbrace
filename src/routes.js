const routes = [
  {
    from: "mirpur 10",
    to: "dhanmondi 27",
    legs: [
      { mode: "Rickshaw", from: "Mirpur 10", to: "Mirpur 1", duration: 10, cost: 40 },
      { mode: "Bus (Mirpur-Azimpur)", from: "Mirpur 1", to: "Science Lab", duration: 35, cost: 15 },
      { mode: "Rickshaw", from: "Science Lab", to: "Dhanmondi 27", duration: 8, cost: 30 },
    ]
  },
  {
    from: "gulshan 1",
    to: "motijheel",
    legs: [
      { mode: "CNG", from: "Gulshan 1", to: "Farmgate", duration: 20, cost: 80 },
      { mode: "Bus (Farmgate-Motijheel)", from: "Farmgate", to: "Motijheel", duration: 25, cost: 10 },
    ]
  },
  {
    from: "uttara",
    to: "farmgate",
    legs: [
      { mode: "Metro Rail", from: "Uttara North", to: "Farmgate", duration: 30, cost: 60 },
    ]
  },
];

export default routes;