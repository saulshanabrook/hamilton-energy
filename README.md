# Hamilton Energy
I set about to calculate the tradeoff between cost and human lives, based on what energy provider you choose. Currently it is only relevant for those who live in Hamilton, NY (or more specifically, within the zip code 13346).

## Calculation Process
First I calculated the energy mix of each utility. I used the mix on their website[1] and filled in with the average energy mix[2] for any missing data. Then using that mix, I figured out the average emmissions for each utility, using the emmisions / kWh data[3].

Using their emmissions and the inputted monthly usage[4], I could determine the monthly emmissions for the selected utility and compare that to the incumbent utility. Then I could figure out what the total difference in emmitted carbon would be, from now to 2030.

Using the total number of deaths caused by climate change[5], compared to if temperatures had stayed at their 2000s levels, and the total projected carbon emmissions[6] producing that change in temperature, I extrapolated to determine how many deaths a relative change in the carbon output would save.


## Data Sources
1. Websites of each energy source provider
2. U.S. Energy Information Agnency Data through the [Electricity Data Browser](http://www.eia.gov/electricity/data/browser/#/topic/0?agg=2,0,1&fuel=vtvo&geo=0002&sec=00g&freq=A&start=2001&end=2013&ctype=columnchart&ltype=sourcekey&rtype=s&pin=&rse=1&maptype=0). [Screenshot of the 2009 data table](https://www.dropbox.com/s/8xjkm34cm949csa/Screenshot%202014-11-19%2022.40.15.png?dl=0).
3. [2014 IPCC report, page 10](http://report.mitigation2014.org/drafts/final-draft-postplenary/ipcc_wg3_ar5_final-draft_postplenary_annex-iii.pdf). [Screenshot of data table](https://www.dropbox.com/s/ft6g286iclqepwu/Screenshot%202014-11-19%2023.13.36.png?dl=0).
4. [U.S. Energy Information Administration, 2009 Residential Energy Consumption Survey.](http://www.eia.gov/consumption/residential/data/2009/index.cfm?view=consumption#fuel-consumption) using the "Average Site Energy Consumption" of electricity for New York State in [Table CE2.2](http://www.eia.gov/consumption/residential/data/2009/c&e/fuel-totals/xls/CE2.2%20Northeast%20Site%20Fuel%20Consumption.xlsx).
5. WHO report ["Quantitative risk assessment of the effects of climate change on selected causes of death, 2030s and 2050s"](http://apps.who.int/iris/bitstream/10665/134014/1/9789241507691_eng.pdf?ua=1), page 1.
6. [2004 IPCC report](https://www.ipcc.ch/pdf/special-reports/spm/sres-en.pdf), page 9


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

