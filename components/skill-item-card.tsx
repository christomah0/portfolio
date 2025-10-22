import { SkillType } from "@/types/skill.type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const SkillItemCard = (props: SkillType) => {
  return (
    <Card className="border-none shadow-lg text-center">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{props.description}</p>
      </CardContent>
    </Card>
  );
}

export default SkillItemCard;
