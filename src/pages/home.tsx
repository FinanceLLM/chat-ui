import { ChatInput } from "../components/chat-input";
import { ExampleBox } from "../components/example-box";
import { Layout } from "../components/layout";
import { ModelInfo } from "../components/model-info";

function Home() {
  return (
    <Layout>
      <div className="w-full top-1/4 translate-y-1/4 ">
        <div className="min-w-full flex flex-col gap-14">
          <h1 className="text-4xl font-bold text-center pb-5">Finance LLM</h1>
          <div className="lg:col-span-3 lg:mt-6">
            <p className="text-lg pb-5">Examples</p>
            <div className="grid gap-3 lg:grid-cols-3 lg:gap-5">
              <ExampleBox exMessage="Write an email from bullet list" />
              <ExampleBox exMessage="Code a snake game" />
              <ExampleBox exMessage="Assist in a task" />
            </div>
          </div>
          <ChatInput />
          <ModelInfo />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
