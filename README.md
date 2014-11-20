# Hamilton Energy
I set about to calculate the tradeoff between cost and human lives, based on what energy provider you choose. Currently it is only relevant for those who live in Hamilton, NY (or more specifically, within the zip code 13346).

## Wait, what?
If you are a homeowner in Hamilton, NY you have access to many [Energy Service Companies](http://www.askpsc.com/askpsc/page/?PageAction=renderPageById&PageId=7f285010bbcba4320235157257b2dc82). Each of them have different costs and are provided by different companies, with different energy mixes. So once we know the energy mix of a certain provider (10% wind, 20% nuclear, 70% gas), we can estimate the average life cycle gCO<sup>2</sup>eq/kWh for each provider. Then using an average electricity usage per month (with the option to modify it with your own usage), we can figure out the gCO<sup>2</sup>eq per month. Then we can compare that against different companies, to see what the price differential is per gCO<sup>2</sup>eq. We have a scatter plot of each utility, of gCO<sup>2</sup>eq vs. price. Then, when you hover over a price, it says “You can pay x more per month to reduce your carbon footprint by y”.

Now comes the interesting part. Using estimations of projected deaths resulting from climate change depending on how much the 	temperature rises, combined with other models showing how greenhouse gas emissions will influence temperature changes, we can predict how different greenhouse gas emissions will affect total deaths. Then we can turn that previous figure of how much you would reduce your carbon footprint by to the number of deaths you would prevent.

Then we can say “If you don’t choose the more expensive rate, you value lives at less than z”

## …again, slower this time?
- [x] Scrape [New York State Public Service Commission](http://www.newyorkpowertochoose.com/) site for different utilities and their costs.
- [x] Hand compile a list of their energy makeups (available in [`services.js`](services.js:95-213).
	- For this process I went to the respective sites for each of the companies to see if the specified their energy makeup.
	- I only marked down those who did, the majority did not.
	- Some only said they used “renewable” energy without specifying what type. Others said they bought [Renewable Energy Certificates](http://en.wikipedia.org/wiki/Renewable_Energy_Certificate_(United_States)) instead of actually producing renewable energy. I marked all these as `renewable`.
- [x] Manipulate the recorded mixes to fill in the average mix for those who did not specify and fill in a renewable mix for those marked `renewable`
	- [ ] Find average mix of non renewable energy produced in New York state
	- [ ] Set `renewable` sources to the worst of the [qualifying technologies](http://en.wikipedia.org/wiki/Renewable_Energy_Certificate_(United_States)#Qualifying_technologies). I will calculate those based on the worst, because I really can’t tell where in fact they came from and I want to hurt those in the rankings who choose not to disclose specifically what energy source they are making.
- [ ] Input energy carbon costs from [the most recent IPCC report (page 10)](http://report.mitigation2014.org/drafts/final-draft-postplenary/ipcc_wg3_ar5_final-draft_postplenary_annex-iii.pdf).
	- [ ] calculate average carbon costs for each provider
- [ ] Plot cost vs. carbon costs of each provider
	- [ ] have hover over each dot reveal all details of provider
	- [ ] also show the “You can pay x more per month to reduce your carbon footprint by y” underneath
- [x] Figure out how many lives are saved for each ton of carbon not released
	- 250k more people will die each year, between 2030 and 2050, if we continue to track SRES A1b vs “baseline climate”. (from a [WHO report](http://apps.who.int/iris/bitstream/10665/134014/1/9789241507691_eng.pdf?ua=1)).
	- This means 2.5 mil deaths from 2030-2050.
	- number of added deaths per year in 2030-2040 is linearly related to the total carbon dioxide emissions from 1990 to 2030, which is 500Gt (from a [older IPCC report, page 9](https://www.ipcc.ch/pdf/special-reports/spm/sres-en.pdf))
	- calculate the number of people saved by taking whatever fraction of the total emissions you don’t create and multiplying that by 2.5 million.
- [ ] Show people how much they are valuing those lives, based on which choice they are hovering over.

	
## Inaccuracies
I can not make any promises for how accurate any of these numbers are. They are the best estimates I can find, but the way I combined them was “novel”. By that I mean, no one else, that I know of, has made this sort of prediction, which probably means that the data is not sufficient to make this sort of claim.

### Carbon Output
I used the IPCC’s lifecycle carbon outputs for each energy, so these do creation and travel costs for each energy, but they are in no way conclusive. It is impossible to fully measure the carbon cost of any action, especially when so many different moving parts are involved.

Also, many energy companies did not list, or only incompletely listed, their energy mix. There were no standards, as far as I could tell, regulating any access to this information by consumers, so I was unable to obtain any more accurate information than that provided on their sites. I could contact each of them privately to ask, but this was outside my available time frame.

Also, my estimations from the IPCC report did not take into account any systemic regional variability within different sources greenhouse gas emissions, if there was any.

### Lives Saved per Reduction in Greenhouse Gasses
While the carbon output did have some definite uncertainty to it, the largest of error is likely in the calculation determine how many lives are saved for each ton of carbon dioxide that is not emitted.

The WHO numbers detailing how many people are expected to die as result of climate change between the years 2030-2050 is uncertain to begin with. Although they attempted to make a reasonable estimate, any number of future events (war, political movements, technologies) could render this estimate off by orders of magnitude.

Then there is the issue of extrapolating that number of deaths to be dependent on tons of carbon dioxide releasing. In their study they compared SRESA1b to climate levels from pre 1990. They used the Special Report on Emissions Scenarios instead of the newer Representative Concentration Pathways, because they said they did not have time to use the newer models when the report came out, so this is the first area of increased uncertainty. They are using outdated models.

Also, I assumed that number of added deaths was linearly related to the increase in temperature from 1990s levels to the levels at 2030. So, for example, if the temperature goes up by half the amount predicted, then the deaths will also be halved. This is fundamentally inaccurate, but I couldn’t figure out a better way to do it, based on the data provided in their report. They were only comparing two different scenarios, not predicting how the number of deaths relates exactly to carbon output or temperature rise, so I had to extrapolate. 

Next I assumed that the total mass of CO<sub>2eq released between 1990 and 2030 would be linearly related to the temperature difference between them. So if no carbon dioxide was released from 1990 to 2030 then temperatures would stay exactly the same and extra deaths would be zero. Again, this extrapolation is not grounded in any model of carbon dioxide and temperature, I just chose a linear relationship because it easiest to work with and at least makes sense conceptual and in a very general way (more carbon dioxide released will result in a higher temperature at the end).

### Lives Saved per Dollar
I couldn’t find any estimates of the total long term number of deaths from climate change, only the number per year between 2030 and 2050. This means that really the price you are paying is only valid within that timeframe, and in fact a whole lot more people will most likely die, relatively speaking, than just within those years.

