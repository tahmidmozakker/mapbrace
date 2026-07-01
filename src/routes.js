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
  {
    from: "banani",
    to: "sadarghat",
    legs: [
      { mode: "CNG", from: "Banani", to: "Gulistan", duration: 35, cost: 120 },
      { mode: "Rickshaw", from: "Gulistan", to: "Sadarghat", duration: 12, cost: 40 },
    ]
  },
  {
    from: "mohakhali",
    to: "dhanmondi",
    legs: [
      { mode: "Bus (Mohakhali-Dhanmondi)", from: "Mohakhali", to: "Dhanmondi", duration: 30, cost: 15 },
    ]
  },
  {
    from: "mirpur 10",
    to: "motijheel",
    legs: [
      { mode: "Metro Rail", from: "Mirpur 10", to: "Farmgate", duration: 20, cost: 40 },
      { mode: "Bus (Farmgate-Motijheel)", from: "Farmgate", to: "Motijheel", duration: 25, cost: 10 },
    ]
  },
  {
    from: "uttara",
    to: "motijheel",
    legs: [
      { mode: "Metro Rail", from: "Uttara North", to: "Motijheel", duration: 45, cost: 100 },
    ]
  },
  {
    from: "gulshan 2",
    to: "dhanmondi",
    legs: [
      { mode: "Rickshaw", from: "Gulshan 2", to: "Gulshan 1", duration: 8, cost: 30 },
      { mode: "CNG", from: "Gulshan 1", to: "Dhanmondi", duration: 25, cost: 90 },
    ]
  },
  {
    from: "bashundhara",
    to: "farmgate",
    legs: [
      { mode: "Bus (Bashundhara-Farmgate)", from: "Bashundhara", to: "Farmgate", duration: 40, cost: 20 },
    ]
  },
  {
    from: "old dhaka",
    to: "gulshan",
    legs: [
      { mode: "Rickshaw", from: "Old Dhaka", to: "Sadarghat", duration: 10, cost: 30 },
      { mode: "Bus (Sadarghat-Gulshan)", from: "Sadarghat", to: "Gulshan", duration: 50, cost: 20 },
    ]
  },
];

export default routes;