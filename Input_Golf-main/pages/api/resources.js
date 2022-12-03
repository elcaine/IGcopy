import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import matter from 'gray-matter'

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

const resourcesDirectory = path.join(process.cwd(), "resources");

export function getAllResourcesFromDirectory() {
  return fs.readdirSync(resourcesDirectory);
}

export async function getAllResources() {
  let resources = getAllResourcesFromDirectory();
  resources = resources.map(async (resource) => {
    let fileContents = fs.readFileSync(
      path.join(resourcesDirectory, resource),
      "utf8"
    );

    let { data, content } = matter(fileContents);

    content = await markdownToHtml(content || "");
    
    var title = resource.replace(/\.md$/, "").split("_").slice(0)[0] + ". "+resource.replace(/\.md$/, "").split("_").slice(2).join(" ");

    return {
      title,
      content,
    };
  });

  resources = await Promise.all(resources);
  return resources;
}
