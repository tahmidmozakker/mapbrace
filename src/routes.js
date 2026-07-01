const routes = [
  {
    from: "mirpur 10",
    to: "dhanmondi 27",
    options: [
      {
        label: "Bus + Rickshaw",
        legs: [
          { mode: "Rickshaw", from: "Mirpur 10", to: "Mirpur 1", duration: 10, cost: 40 },
          { mode: "Bus (Mirpur-Azimpur)", from: "Mirpur 1", to: "Science Lab", duration: 35, cost: 15 },
          { mode: "Rickshaw", from: "Science Lab", to: "Dhanmondi 27", duration: 8, cost: 30 },
        ]
      },
      {
        label: "CNG Direct",
        legs: [
          { mode: "CNG", from: "Mirpur 10", to: "Dhanmondi 27", duration: 30, cost: 150 },
        ]
      },
      {
        label: "Metro + Rickshaw",
        legs: [
          { mode: "Metro Rail", from: "Mirpur 10", to: "Farmgate", duration: 20, cost: 40 },
          { mode: "Rickshaw", from: "Farmgate", to: "Dhanmondi 27", duration: 12, cost: 50 },
        ]
      },
      {
        label: "Rickshaw All Way",
        legs: [
          { mode: "Rickshaw", from: "Mirpur 10", to: "Dhanmondi 27", duration: 50, cost: 180 },
        ]
      },
    ]
  },
  {
    from: "gulshan 1",
    to: "motijheel",
    options: [
      {
        label: "CNG + Bus",
        legs: [
          { mode: "CNG", from: "Gulshan 1", to: "Farmgate", duration: 20, cost: 80 },
          { mode: "Bus", from: "Farmgate", to: "Motijheel", duration: 25, cost: 10 },
        ]
      },
      {
        label: "CNG Direct",
        legs: [
          { mode: "CNG", from: "Gulshan 1", to: "Motijheel", duration: 35, cost: 160 },
        ]
      },
      {
        label: "Bus Only",
        legs: [
          { mode: "Bus", from: "Gulshan 1", to: "Motijheel", duration: 55, cost: 20 },
        ]
      },
    ]
  },
  {
    from: "uttara",
    to: "farmgate",
    options: [
      {
        label: "Metro Rail",
        legs: [
          { mode: "Metro Rail", from: "Uttara North", to: "Farmgate", duration: 30, cost: 60 },
        ]
      },
      {
        label: "Bus Direct",
        legs: [
          { mode: "Bus", from: "Uttara", to: "Farmgate", duration: 60, cost: 20 },
        ]
      },
      {
        label: "CNG Direct",
        legs: [
          { mode: "CNG", from: "Uttara", to: "Farmgate", duration: 45, cost: 200 },
        ]
      },
    ]
  },
  {
    from: "banani",
    to: "sadarghat",
    options: [
      {
        label: "CNG + Rickshaw",
        legs: [
          { mode: "CNG", from: "Banani", to: "Gulistan", duration: 35, cost: 120 },
          { mode: "Rickshaw", from: "Gulistan", to: "Sadarghat", duration: 12, cost: 40 },
        ]
      },
      {
        label: "Bus + Rickshaw",
        legs: [
          { mode: "Bus", from: "Banani", to: "Gulistan", duration: 50, cost: 20 },
          { mode: "Rickshaw", from: "Gulistan", to: "Sadarghat", duration: 12, cost: 40 },
        ]
      },
    ]
  },
  {
    from: "uttara",
    to: "motijheel",
    options: [
      {
        label: "Metro Rail",
        legs: [
          { mode: "Metro Rail", from: "Uttara North", to: "Motijheel", duration: 45, cost: 100 },
        ]
      },
      {
        label: "Bus Direct",
        legs: [
          { mode: "Bus", from: "Uttara", to: "Motijheel", duration: 90, cost: 25 },
        ]
      },
      {
        label: "CNG Direct",
        legs: [
          { mode: "CNG", from: "Uttara", to: "Motijheel", duration: 60, cost: 250 },
        ]
      },
    ]
  },
];

export default routes;