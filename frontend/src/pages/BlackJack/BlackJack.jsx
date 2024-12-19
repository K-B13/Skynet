import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateRobotCurrency } from "../../services/robot";
import "./Blackjack.css";


const Blackjack = () => {
  const [deck, setDeck] = useState(createDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [playerWins, setPlayerWins] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [moneyEarned, setMoneyEarned] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { robotId } = location.state;
  


  // Redirect if robotId is missing
  useEffect(() => {
    if (!robotId) {
      navigate("/landingpage");
    }
  }, [robotId, navigate]);

  function createDeck() {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck = [];
    suits.forEach((suit) => {
      values.forEach((value) => {
        deck.push({ suit, value });
      });
    });
    return shuffle(deck);
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function calculateTotal(hand) {
    let total = 0;
    let aces = 0;

    hand.forEach((card) => {
      if (["J", "Q", "K"].includes(card.value)) {
        total += 10;
      } else if (card.value === "A") {
        aces += 1;
        total += 11;
      } else {
        total += parseInt(card.value, 10);
      }
    });

    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }

    return total;
  }

  function dealCard(handSetter) {
    const card = deck.pop();
    setDeck([...deck]);
    handSetter((prevHand) => [...prevHand, card]);
    return card;
  }

  function restartGame() {
    const newDeck = createDeck();
    setDeck(newDeck);

    const playerCard1 = newDeck.pop();
    const playerCard2 = newDeck.pop();
    const dealerCard1 = newDeck.pop();

    const playerStartingHand = [playerCard1, playerCard2];
    const dealerStartingHand = [dealerCard1];

    setPlayerHand(playerStartingHand);
    setDealerHand(dealerStartingHand);
    setPlayerTotal(calculateTotal(playerStartingHand));
    setDealerTotal(calculateTotal(dealerStartingHand));
    setGameOver(false);
    setMessage("");
    setGamesPlayed((prevGamesPlayed) => prevGamesPlayed + 1);
  }

  function hit() {
    if (gameOver) return;

    const card = dealCard(setPlayerHand);
    const newTotal = calculateTotal([...playerHand, card]);
    setPlayerTotal(newTotal);

    if (newTotal > 21) {
      setGameOver(true);
      setMessage("You busted! Dealer wins.");
      // setDealerWins((prev) => prev + 1);
    }
  }

  function stand() {
    if (gameOver) return;

    let dealerNewHand = [...dealerHand];
    let dealerNewTotal = dealerTotal;

    while (dealerNewTotal < 17) {
      const card = dealCard(setDealerHand);
      dealerNewHand = [...dealerNewHand, card];
      dealerNewTotal = calculateTotal(dealerNewHand);
    }

    setDealerTotal(dealerNewTotal);

    if (dealerNewTotal > 21) {
      setGameOver(true);
      setMessage("Dealer busted! You win!");
      setPlayerWins((prev) => prev + 1);
    } else if (dealerNewTotal >= playerTotal) {
      setGameOver(true);
      setMessage("Dealer wins!");
      setDealerWins((prev) => prev + 1);
    } else {
      setGameOver(true);
      setMessage("You win!");
      setPlayerWins((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (gamesPlayed >= 8) {
      navigate("/gameselection", {state: {robotId: robotId}});
    }
  }, [gamesPlayed, navigate]);

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    if (gameOver) {
      const cash = message.includes("You win!") ? playerWins * 50 : 0;
      setMoneyEarned(cash);
  
      const updateCurrency = async () => {
        try {
          const response = await updateRobotCurrency(robotId, cash);
          if (response.message === "robot currency updated") {
            navigate("/gameselection", {state: {robotId: robotId}});
          }
        } catch (error) {
          console.error("Error updating currency:", error);
        }
      };
  
      const timer = setTimeout(() => {
        updateCurrency();
      }, 6000);
  
      return () => clearTimeout(timer);
    }
  }, [gameOver, playerWins, message, robotId, navigate]);
  



  return (
    <div id="blackjack-page">
    <div className="game-container">
      <h1>Blackjack Game</h1>
      <div>
        <h2>Your Hand ({playerTotal})</h2>
        <div className="hand">
          {playerHand.map((card, index) => (
            <div key={index} className={`card ${["♥", "♦"].includes(card.suit) ? "red" : ""}`}>
              {card.value}
              <div className="suit">{card.suit}</div>
            </div>
          ))}
        </div>
        <button onClick={hit} disabled={gameOver}>
          Hit
        </button>
        <button onClick={stand} disabled={gameOver}>
          Stand
        </button>

        <h2>Dealer&apos;s Hand ({gameOver ? dealerTotal : "?"})</h2>
        <div className="hand">
          {dealerHand.map((card, index) => (
            <div key={index} className={`card ${["♥", "♦"].includes(card.suit) ? "red" : ""}`}>
              {card.value}
              <div className="suit">{card.suit}</div>
            </div>
          ))}
        </div>

        {gameOver && <div className="message">{message}
        <p>You earned: ${moneyEarned}</p></div>}
        {gameOver && (
          <button onClick={restartGame} style={{ marginTop: "20px" }}>
            Restart Game
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default Blackjack;
