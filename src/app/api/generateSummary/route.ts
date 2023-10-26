import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();
  // console.log(todos);

  // complete with openai gpt

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When reponding, welcome the user always as Mr.User and say welcome to your Todo App! Limit the response to 200 characters`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To-do, In-progress and Done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { choices } = response;
  // console.log(response);
  // console.log(choices[0].message);

  return NextResponse.json(choices[0].message);
}
