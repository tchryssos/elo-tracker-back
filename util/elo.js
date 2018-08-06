const kFactor = 32

exports.kFactor = kFactor

exports.expected_score = (eloOne, eloTwo) => eloOne / (eloOne + eloTwo)

exports.newElo = (elo, percentage, score) => (
  elo + (kFactor * (score - percentage))
)
