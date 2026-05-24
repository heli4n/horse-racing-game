import { defineStore } from 'pinia'

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

function sample(array, count) {
	return shuffle(array.slice()).slice(0, count)
}

export const useRaceStore = defineStore('race', {
	state: () => ({
		horses: [],
		races: [],
		currentRaceId: null,
		currentRaceIndex: 0,
		isRaceRunning: false,
		elapsedMs: 0,
		_intervalId: null
	}),

	actions: {
		init() {
			this.generateHorses()
			this.createRaces()
		},

		generateHorses() {
			const conditionPool = shuffle(Array.from({ length: 100 }, (_, i) => i + 1))

			this.horses = []

			for (let i = 0; i < 20; i++) {
				this.horses.push({
					id: i + 1,
					name: `Horse ${i + 1}`,
					condition: conditionPool[i],
					image: new URL(`../assets/horses/horse${i + 1}.png`, import.meta.url).href,
					position: 0,
					finished: false
				})
			}
		},

		createRaces() {
			const distances = [1200, 1400, 1600, 1800, 2000, 2200]

			this.races = distances.map((distance, index) => ({
				id: index,
				distance: distance,
				participants: [],
				results: [],
				luckRanking: [],
				status: 'idle'
			}))
		},

		pickHorsesForRace(raceId) {
			const race = this.races[raceId]
			if (!race) return

			const chosen = sample(this.horses, 10).map(horse => ({
				id: horse.id,
				name: horse.name,
				condition: horse.condition,
				image: horse.image,
				position: 0,
				finished: false,
				finishTime: null,
				luckScore: 0,
				finalScore: 0
			}))

			race.participants = chosen
			race.results = []
			race.luckRanking = []
			race.status = 'ready'
		},

		calculatePerformance(condition, luckScore) {
			return condition * 0.7 + luckScore * 0.3
		},

		calculateLuckRanking(race) {
			race.participants.forEach(horse => {
				horse.luckScore = Math.random() * 100
			})

			race.luckRanking = race.participants
				.slice()
				.sort((a, b) => b.luckScore - a.luckScore)
				.slice(0, 3)
				.map((horse, index) => ({
					rank: index + 1,
					id: horse.id,
					name: horse.name,
					image: horse.image
				}))
		},

		startRace() {
			if (this.isRaceRunning) return

			if (this.currentRaceIndex >= this.races.length) return

			let race = this.races[this.currentRaceIndex]

			if (race.status === 'finished') {
				this.currentRaceIndex++

				if (this.currentRaceIndex >= this.races.length) return

				race = this.races[this.currentRaceIndex]
			}

			if (!race.participants || race.participants.length === 0) {
				this.pickHorsesForRace(race.id)
			}

			this.calculateLuckRanking(race)

			this.isRaceRunning = true
			this.currentRaceId = race.id
			this.elapsedMs = 0
			race.status = 'running'

			race.participants.forEach(horse => {
				horse.position = 0
				horse.finished = false
				horse.finishTime = null
				horse.finalScore = this.calculatePerformance(horse.condition, horse.luckScore)
			})

			const maxScore = Math.max(...race.participants.map(horse => horse.finalScore))

			race.participants.forEach(horse => {
				horse._speed = (horse.finalScore / maxScore) * 0.35 + 0.05
			})

			const tickMs = 100

			this._intervalId = setInterval(() => {
				this.elapsedMs += tickMs

				race.participants.forEach(horse => {
					if (horse.finished) return

					const progressInc = horse._speed * (tickMs / 1000) * 25
					horse.position = Math.min(100, horse.position + progressInc)

					if (horse.position >= 100) {
						horse.position = 100
						horse.finished = true
						horse.finishTime = this.elapsedMs
					}
				})

				const allDone = race.participants.every(horse => horse.finished)

				if (allDone) {
					clearInterval(this._intervalId)
					this._intervalId = null

					this.isRaceRunning = false
					race.status = 'finished'

					const sorted = race.participants
						.slice()
						.sort((a, b) => a.finishTime - b.finishTime)

					race.results = sorted.map((horse, index) => ({
						rank: index + 1,
						id: horse.id,
						name: horse.name,
						image: horse.image,
						condition: horse.condition,
						time: horse.finishTime
					}))

					this.currentRaceId = null
				}
			}, tickMs)
		},

		resetGame() {
			if (this._intervalId) {
				clearInterval(this._intervalId)
				this._intervalId = null
			}

			this.isRaceRunning = false
			this.currentRaceId = null
			this.currentRaceIndex = 0
			this.elapsedMs = 0

			this.generateHorses()
			this.createRaces()
		}
	}
})