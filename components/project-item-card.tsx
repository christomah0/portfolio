import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import Link from "next/link";
import { ProjectType } from "../types/project.type";
import { FaExternalLinkAlt } from "react-icons/fa";

const ProjectItemCard = (props: ProjectType) => {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="w-full relative h-64">
        <Image
          src={props.imageUrl}
          alt={props.name}
          fill={true}
          className="rounded-2xl object-cover px-6" // Add 'object-cover' to prevent image stretching
        />
      </CardContent>
      <CardFooter className="w-full grid grid-rows-3">
        <CardTitle>{props.name}</CardTitle>
        <p className="text-gray-700">{props.shortDescription}</p>
        <Link
          className="text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full w-fit flex justify-center items-center gap-2"
          href={props.link}
          target="_blank"
        >
          {props.linkName}<FaExternalLinkAlt size={16} />
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProjectItemCard;
