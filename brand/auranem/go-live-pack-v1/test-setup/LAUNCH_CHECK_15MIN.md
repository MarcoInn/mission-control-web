# 15-Min Launch Preflight Checklist

## T-15 to T-10: Tracking + Routing
- [ ] Landing page URL loads fast on mobile and desktop
- [ ] Correct UTM attached to each ad (asset + variant + language)
- [ ] Pixel/events firing (PageView, ViewContent, InitiateCheckout/Purchase as relevant)
- [ ] No broken links or redirect loops

## T-10 to T-7: Creative + Copy QA
- [ ] Correct asset mapped to correct ad name
- [ ] Caption variant matches language (DE/EN)
- [ ] Thumbnail/first frame aligned with hook text
- [ ] Compliance pass: no prohibited claims, no guarantees

## T-7 to T-4: Campaign Setup QA
- [ ] Campaign objective set correctly (conversion)
- [ ] Ad set budget and schedule confirmed
- [ ] Audience targeting matches plan
- [ ] Placements verified (Reels/Feed/etc.)

## T-4 to T-2: Measurement Sheet Ready
- [ ] `TRACKING_SHEET.csv` opened and saved as working copy
- [ ] Baseline row values at zero
- [ ] Decision owner assigned for 24h + 48h checkpoints

## T-2 to Launch: Final Gate
- [ ] Sequence confirmed: UGC -> Static -> Hero
- [ ] Team knows go/kill/iterate thresholds from `TEST_MATRIX_48H.md`
- [ ] Rollback rule agreed: pause immediately if tracking fails
- [ ] Launch approved
