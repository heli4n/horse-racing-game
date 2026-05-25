**Race Mechanics**

The game creates 20 horses. Each horse has a unique condition score between 1 and 100.
For each race, 10 horses are randomly selected. Performance is calculated with:
condition * 0.7 + luckScore * 0.3
This means condition is important, but luck can still affect the result. 
Location:
src/stores/raceStore.js, calculatePerformance() ,line 84.

**Design Desicion, I am Proud of**

One of the design decisions that I am proud of is the result panel. Instead of showing all 10 results directly, for each race only the top 3 is shown. To see the all 10 result you just need to click on the desired race and there will be a closable pop up. This way I obtain more clean interface.
Location: src/components/ResultsPanel.vue ,line 43-45.


**Design Desicion, I Would Revisit**



