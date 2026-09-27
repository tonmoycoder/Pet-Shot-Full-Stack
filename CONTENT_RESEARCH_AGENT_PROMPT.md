# CONTENT RESEARCH AGENT — EXECUTION PROMPT

Read:
1. docs/WEBSITE_CONTENT_DATA_COLLECTION_MASTER.md
2. docs/FINAL_ZERO_COST_MASTER_DECISION.md
3. existing CMS schema
4. existing content/media folders

Do not invent content.

Tasks:
1. Inspect current project and identify existing collections/content.
2. Build research-backed candidate datasets for birds, fish, cages, food, aquarium equipment and care topics.
3. Separate:
   - OWNER_PROVIDED
   - RESEARCH_BACKED
   - SHOP_CONFIRMATION_REQUIRED
   - DO_NOT_PUBLISH
4. For each external fact, store source URL.
5. For every external image, store exact source URL, creator, license, license URL, collection date and attribution requirement.
6. Check Bangladesh wildlife/legal status before listing potentially regulated/wild birds.
7. Never invent price, stock, health status, dosage, or availability.
8. Do not modify production CMS until the candidate dataset is reviewed.
9. Create the required JSON/CSV/MD content files listed in the master brief.

At the end report:
- files created
- candidate records
- records needing shop confirmation
- legal-review items
- missing owner information
- media licensing risks
- next recommended action
