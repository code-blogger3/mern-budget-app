import Card from "@mui/joy/Card";

function BudgetCards({ name, max }) {
  return (
    <Card color="primary" orientation="vertical" size="sm">
      <div>{name}</div>
      <div>{max}</div>
    </Card>
  );
}

export default BudgetCards;
