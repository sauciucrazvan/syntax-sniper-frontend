import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Crown, HeartIcon, Star } from "lucide-react";

export default function MainScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [data, setData] = useState<{
    code: string;
    language: string;
    options: string[];
  } | null>(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setBestScore(
          localStorage.getItem("bestScore")
            ? parseInt(localStorage.getItem("bestScore")!)
            : 0
        );
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8080/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const snippet = await response.json();
        setData(snippet);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [score]);

  const handleGuess = (option: string) => {
    if (option === data!.language) {
      setScore(score + 1);
      if (score + 1 > bestScore) {
        localStorage.setItem("bestScore", (score + 1).toString());
        setBestScore(score + 1);
      }

      toast.success("Correct! (+1p)", {
        description: `You guessed ${data!.language.toLocaleUpperCase()} correctly!`,
      });
    } else {
      setScore(score - 1);
      setLives(lives - 1);

      toast.warning("Wrong answer (-1p)", {
        description: `The correct answer was ${data!.language.toLocaleUpperCase()}`,
      });
    }
  };

  if (error) {
    return <div className="pt-4">Error: {error}</div>;
  }

  if (loading || data === null) {
    return (
      <div className="pt-4">
        <Spinner />
      </div>
    );
  }

  if (lives <= 0) {
    return (
      <section className="pt-4 max-w-[60%] min-w-[60%] flex flex-col gap-4 items-center">
        <div className="text-lg font-bold --font-roboto-condensed bg-gradient-to-br from-red-500 to-red-700 bg-clip-text text-transparent">
          GAME OVER!
        </div>

        <p className="text-md text-foreground/80 text-center">
          Your final score: <b>{score} points</b>
          {score === bestScore && " (new best score!)"}
          <br />
          {score < 0
            ? "Better luck next time!"
            : score >= 10
            ? "Well played my man!"
            : "You're decent, but you can do better!"}
        </p>

        <Button
          onClick={() => {
            setScore(0);
            setLives(3);
            setData(null);
          }}
          className="rounded cursor-pointer bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Play Again
        </Button>
      </section>
    );
  }

  return (
    <section className="pt-4 max-w-[60%] flex flex-col gap-4 items-center">
      <div className="text-md flex flex-row items-center gap-4">
        <Badge variant="secondary" className="rounded bg-blue-500">
          <Star /> Your score: {score}
        </Badge>
        <Badge variant="default" className="rounded bg-amber-300">
          <Crown /> Best score: {bestScore}
        </Badge>
        {[...Array(lives)].map((_, index) => (
          <HeartIcon key={index} className="text-red-500" />
        ))}
      </div>

      <pre className="w-full p-2 overflow-x-auto bg-foreground/5 border border-foreground/10 rounded text-sm font-mono">
        <code>{data.code}</code>
      </pre>

      <div className="flex flex-row gap-1">
        {data.options.map((option: string) => (
          <Button
            key={option}
            onClick={() => handleGuess(option)}
            className="mt-4 rounded cursor-pointer bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            {option}
          </Button>
        ))}
      </div>
    </section>
  );
}
