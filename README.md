# Hamilton Energy
I set about to calculate the tradeoff between cost and human lives, based on what energy provider you choose. Currently it is only relevant for those who live in Hamilton, NY (or more specifically, within the zip code 13346).

## Calculation Process
First I calculated the energy mix of each utility. I used the mix on their website and filled in with the average energy mix for any missing data. Then using that mix, I figured out the average emmissions for each utility, using the emmisions / kWh data.

Using their emmissions and the inputted monthly usage, I could determine the monthly emmissions for the selected utility and compare that to the incumbent utility. Then I could figure out what the total difference in emmitted carbon would be, from now to 2030.

Using the total number of deaths caused by climate change, compared to if temperatures had stayed at their 2000s levels, and the total projected carbon emmissions producing that change in temperature, I extrapolated to determine how many deaths a relative change in the carbon output would save.

## Inaccuracies
I can not make any promises for how accurate any of these numbers are. They are the best estimates I can find, but the way I combined them was “novel”. By that I mean, no one else, that I know of, has made this sort of prediction, which probably means that the data is not sufficient to make this sort of claim.

### Carbon Output
I used the IPCC’s lifecycle carbon outputs for each energy, so these do creation and travel costs for each energy, but they are in no way conclusive. It is impossible to fully measure the carbon cost of any action, especially when so many different moving parts are involved.

Also, many energy companies did not list, or only incompletely listed, their energy mix. There were no standards, as far as I could tell, regulating any access to this information by consumers, so I was unable to obtain any more accurate information than that provided on their sites. I could contact each of them privately to ask, but this was outside my available time frame. When I estimated the average power production in New York state, when the company did not provide any information, I used "Net generation for independent power producers", which shows the average for the produciton in the state. However, some of the energy you buy from these companies might actually be produced out of state and then sent in, so this mix is not neccarily representatiev. Also, of course, it is only an average for the state so each energy company would, in actuallity, have a different mix of energies than the ones predicted.

Also, my estimations from the IPCC report did not take into account any systemic regional variability within different sources greenhouse gas emissions, if there was any.

### Lives Saved per Reduction in Greenhouse Gasses
While the carbon output did have some definite uncertainty to it, the largest of error is likely in the calculation determine how many lives are saved for each ton of carbon dioxide that is not emitted.

The WHO numbers detailing how many people are expected to die as result of climate change between the years 2030-2050 is uncertain to begin with. Although they attempted to make a reasonable estimate, any number of future events (war, political movements, technologies) could render this estimate off by orders of magnitude.

Then there is the issue of extrapolating that number of deaths to be dependent on tons of carbon dioxide releasing. In their study they compared SRESA1b to climate levels from pre 1990. They used the Special Report on Emissions Scenarios instead of the newer Representative Concentration Pathways, because they said they did not have time to use the newer models when the report came out, so this is the first area of increased uncertainty. They are using outdated models.

Also, I assumed that number of added deaths was linearly related to the increase in temperature from 1990s levels to the levels at 2030. So, for example, if the temperature goes up by half the amount predicted, then the deaths will also be halved. This is fundamentally inaccurate, but I couldn’t figure out a better way to do it, based on the data provided in their report. They were only comparing two different scenarios, not predicting how the number of deaths relates exactly to carbon output or temperature rise, so I had to extrapolate.

Next I assumed that the total mass of CO<sub>2</sub>eq released between 1990 and 2030 would be linearly related to the temperature difference between them. So if no carbon dioxide was released from 1990 to 2030 then temperatures would stay exactly the same and extra deaths would be zero. Again, this extrapolation is not grounded in any model of carbon dioxide and temperature, I just chose a linear relationship because it easiest to work with and at least makes sense conceptual and in a very general way (more carbon dioxide released will result in a higher temperature at the end).

### Lives Saved per Dollar
I couldn’t find any estimates of the total long term number of deaths from climate change, only the number per year between 2030 and 2050. This means that really the price you are paying is only valid within that timeframe, and in fact a whole lot more people will most likely die, relatively speaking, than just within those years.

