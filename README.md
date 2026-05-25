**Race Mechanics**

The game creates 20 horses. Each horse has a unique condition score between 1 and 100.
For each race, 10 horses are randomly selected. Performance is calculated with:
condition * 0.7 + luckScore * 0.3
This means condition is important, but luck can still affect the result. 
Location:
src/stores/raceStore.js, calculatePerformance() ,line 84.

**Design Desicion, I am Proud of**

One of the design decisions that I am proud of is the result panel. Instead of showing all 10 results directly, for each race only the top 3 is shown. To see the all 10 result you just need to click on the desired race and there will be a closable pop up. This way I obtain more clean interface.
Location: src/components/ResultsPanel.vue ,lines 43-45.

**Design Desicion, I Would Revisit**

One design decision I would revisit is how the race animation logic and the selected horse display are handled.

Currently, horse positions are updated with "setInterval", and it directly controls timing, movement, finish detection, and result creation. This works fine for the current project size, but I would revisit it because it is doing too many responsibilities at once. If I had more time, I would separate the animation/timing logic from the race result logic.
Location: "src/stores/raceStore.js", lines 105–187. 

I would also revisit how selected horses are shown in the left panel. Right now, the panel shows the selected horses directly inside the main layout. It is simple and readable, but I am not satisfied. Location: "src/App.vue", lines 30–60.

**What Would Break First in Larger Scale**

Like I mentioned in the revisit part, the startRace() logic would have break first. I need to separate race simulation, horse generation, and UI state into different modules.

**First Thing to Tell a Teammate**

That the main game logic lives in src/stores/raceStore.js and components mostly display the state.

**Hardest Part**

The hardest part was managing the it within the time limit. I am currently in an exchange program in Korea, and the case study period overlapped with my midterm and presentation week.
Because of that, I had to prioritize the core race flow, animation, and visual design instead of trying to implement every possible feature.

**Assumptions**

- The same horse can appear in multiple races.
- Race results are calculated during animation, not fully precomputed.
- Top 3 results are enough for the compact panel, while full results can be shown in a popup.

**What I Cut**

I did not add betting, replay mode, or advanced statistics. I focused on the core race flow, animation, and visual design.

*With another week, I would add:*

- Betting
- Tournament summary statistics
- Replay mode

**AI Workflow**

Since I had a time problem. First I used AI to have a ready template that I can work and modify on. I used this prompt: 

    I’m working on a Vue 3 frontend case study. It is a horse racing game and I already set up the project with Vite and installed Pinia.

    The main rules are:
    - there should be 20 horses
    - each horse needs a different color and a condition score from 1 to 100
    - there will be 6 races: 1200m, 1400m, 1600m, 1800m, 2000m, 2200m
    - every race should randomly pick 10 horses
    - condition should affect the race result, but random chance should still make surprises possible
    - horses should move on the track during the race
    - the next race should not start before the current one finishes
    - finished race results should be shown in a result area

    I want to start from the Pinia store. Can you create src/stores/raceStore.js for the main game logic?

    It should include:
    - creating the horse list
    - creating the race list
    - picking 10 horses for a race
    - calculating race results with condition + randomness
    - starting a race
    - resetting the game


 then controlled and changed the code according to my game logic (eg. race winning logic, and ui design). I made the final design and implementation decisions myself.

**AI Suggestion That I Did Not Use**

One AI suggestion I did not fully follow was making the UI more generic and modern and how to calculate race result. Because I trust my UI design choices, and game logic should be decided by me.

**Mislead Of AI**

AI was sometimes misleading when suggesting changes without considering my existing file structure. It also sometimes tried to improve parts of the code that I did not ask to change. I caught this by checking the actual project files carefully and testing the app after each change.

**Bonus**

I chose the architectural decision track. The main decision was to simulate the race progression in the store instead of only pre-computing the final race result before the animation starts. I chose this approach because it makes the animation and the race state easier to connect. The UI only needs to read the current store state and display the horses based on their progress. 



