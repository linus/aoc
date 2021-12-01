use std::io::{self, Read};
use std::collections::{HashSet, VecDeque};

fn main() -> io::Result<()> {
    let mut input = String::new();
    let mut stdin = io::stdin();
    stdin.read_to_string(&mut input)?;

    let players: Vec<VecDeque<usize>> = input
        .split("\n\n")
        .map(|s| s.split('\n').filter_map(|s| s.parse().ok()).collect())
        .collect();

    let (_, score) = part1(players[0].clone(), players[1].clone());

    println!("{}", score);

    let mut game = Game::new(players[0].clone(), players[1].clone());
    let winner = game.play();

    println!("{}", calculate_score(if winner == 0 { &game.player1 } else { &game.player2 }));

    Ok(())
}

fn part1(mut player1: VecDeque<usize>, mut player2: VecDeque<usize>) -> (usize, usize) {
    let mut turns = 0;

    while player1.len() > 0 && player2.len() > 0 {
        turns += 1;
        let card1 = player1.pop_front().unwrap();
        let card2 = player2.pop_front().unwrap();

        if card1 > card2 {
            player1.push_back(card1);
            player1.push_back(card2);
        } else if card2 > card1 {
            player2.push_back(card2);
            player2.push_back(card1);
        }
    }

    let winner = if player1.len() > 0 { &player1 } else { &player2 };

    (turns, calculate_score(winner))
}

fn calculate_score(hand: &VecDeque<usize>) -> usize {
    let num_cards = hand.len();
    hand
        .iter()
        .enumerate()
        .fold(0, |score, (index, card)| score + card * (num_cards - index))
}

struct Game {
    seen: HashSet<Vec<usize>>,
    player1: VecDeque<usize>,
    player2: VecDeque<usize>,
}

impl Game {
    fn new(player1: VecDeque<usize>, player2: VecDeque<usize>) -> Game {
        Game {
            seen: HashSet::new(),
            player1,
            player2,
        }
    }

    fn play(&mut self) -> usize {
        while self.player1.len() > 0 && self.player2.len() > 0 {
            let sig1 = Vec::from(self.player1.clone());
            let sig2 = Vec::from(self.player2.clone());

            if self.seen.contains(&sig1) || self.seen.contains(&sig2) {
                return 0;
            }

            self.seen.insert(sig1);
            self.seen.insert(sig2);

            let card1 = self.player1.pop_front().unwrap();
            let card2 = self.player2.pop_front().unwrap();

            let winner = if self.player1.len() >= card1 && self.player2.len() >= card2 {
                Game::new(
                    self.player1.clone().into_iter().take(card1).collect(),
                    self.player2.clone().into_iter().take(card2).collect(),
                ).play()
            } else if card1 > card2 {
                0
            } else {
                1
            };

            if winner == 0 {
                self.player1.push_back(card1);
                self.player1.push_back(card2);
            } else {
                self.player2.push_back(card2);
                self.player2.push_back(card1);
            }
        }

        if self.player1.len() > 0 { 0 } else { 1 }
    }
}
