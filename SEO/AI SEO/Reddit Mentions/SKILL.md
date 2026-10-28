---
name: seo-reddit-mentions
description: Community authority engineering, authentic Reddit discussion participation, sub-community problem solving, and organic brand citations that feed LLM training corpora.
metadata:
  category: AI SEO
  discipline: Community Authority
  version: "1.0.0"
---

# Reddit Mentions & Community Authority

## A. Purpose
The Reddit Mentions skill governs the authentic, value-first participation and brand citation architecture across Reddit, Hacker News, and specialized technical developer forums. In 2024, Google formed formal data-licensing partnerships with Reddit, dramatically amplifying the visibility of Reddit threads in organic search (via the "Discussions and Forums" SERP module) and feeding Reddit conversations directly into AI training corpora and real-time RAG pipelines. Concurrently, generative search engines (Perplexity, ChatGPT Search, Google Gemini) heavily bias their recommendations toward authentic peer discussions on Reddit. This skill establishes an ethical, anti-spam methodology to build community trust, answer technical inquiries, and establish permanent brand citations in high-authority forum threads.

## B. Trigger Conditions
Invoke this skill when:
1. Google SERPs for high-priority commercial queries are heavily dominated by Reddit threads in positions 1 through 5.
2. AI answer engines cite Reddit threads as primary proof points when recommending competitors.
3. Launching open-source developer tooling, benchmark studies, or free technical utilities that solve community pain points.
4. Auditing brand sentiment and community perception across developer and professional subreddits.

Upstream dependencies: [Low-competition Keywords](../../Keyword%20Research/Low-competition%20Keywords/SKILL.md) and [AI Search Visibility](../AI%20Search%20Visibility/SKILL.md).

## C. Scope and Boundaries
- **In-Scope**:
  - Identifying high-ranking, indexed Reddit threads answering core customer questions.
  - Ethical, authentic community participation guidelines (providing exhaustive answers before linking).
  - Monitoring subreddit keywords and brand mentions using Reddit API / RSS feeds.
  - Sponsoring or organizing official Ask-Me-Anything (AMA) events and developer showcases.
  - Engineering technical responses that get upvoted to the top comment position.
- **Out-of-Scope**:
  - Astroturfing, purchasing aged Reddit accounts, or using automated bot upvoting rings (strictly prohibited; leads to permanent domain blacklisting).
  - Paid Reddit Ads management (Handled by Paid Acquisition).
  - General customer service ticket handling (Handled by Support teams).

## D. Required Inputs
1. **Target Subreddits**: Relevant communities (e.g., `r/devops`, `r/PostgreSQL`, `r/sysadmin`, `r/SaaS`, `r/webdev`).
2. **Subject Matter Expert Account**: An authentic, established Reddit account with positive karma history, verified user flair, and a transparent corporate affiliation statement.
3. **Target Resource / Documentation Asset**: A high-utility, non-gated educational guide, benchmark, or open-source tool.

## E. Required Tools and Data Sources
- **Commercial Tooling**: Brand24 (Reddit monitoring), GummySearch (Subreddit audience research and conversation finder), Syften.
- **Zero-Cost / Open Source Alternatives**:
  - Google Advanced Search for ranking Reddit threads:
    ```
    site:reddit.com/r/devops "database backup"
    site:reddit.com "best postgresql tools" intitle:2026
    ```
  - Reddit Public Search and Subreddit RSS feeds (`https://www.reddit.com/r/devops/new/.rss`).
  - Python scripts using the `praw` (Python Reddit API Wrapper) library for keyword scanning.

## F. Core Concepts and Decision Principles
1. **The Reddit Ecosystem Immune System**:
   - Reddit communities possess an intense hostility toward corporate marketing, self-promotion, and superficial link dropping.
   - Dropping a promotional link with a 2-sentence generic comment will result in:
     1. Immediate downvotes to negative karma.
     2. Comment deletion by subreddit moderators.
     3. Permanent domain-level blacklisting via AutoModerator regex filters.
2. **The 90/10 Rule of Community Contribution**:
   - 90% of your contributions must be **pure, selfless educational value**: answering questions, debugging code, sharing architecture diagrams, and providing troubleshooting advice with zero links to your website.
   - 10% of your contributions may include a **contextual reference to your free tool, benchmark study, or open-source repository**, strictly when it directly answers the original poster's specific dilemma.
3. **Why Reddit Feeds AI Search Engines**:
   - LLM search engines heavily discount polished corporate landing pages because they are inherently biased sales pitches.
   - LLMs treat Reddit upvoted comments as **unbiased, peer-verified ground truth**. If multiple senior engineers on `r/devops` recommend a specific tool for automated backups, Perplexity and ChatGPT will synthesize that tool as the #1 community-recommended solution.

## G. Operational Workflow

```
[Harvest Google-Ranking Reddit Threads] -> [Monitor Subreddit RSS Feeds for Target Keywords]
                   |                                                    |
                   v                                                    v
     [Audit Thread Relevance & Mod Rules] -> [Draft Exhaustive Technical Solution]
                   |                                                    |
                   v                                                    v
      [Disclose Affiliation Transparently] -> [Engage in Ongoing Follow-Up Discussion]
```

### Step 1: Mine Google-Ranking Reddit Threads
Identify the existing Reddit threads that already rank on Google page 1 for your target keywords:
```bash
# Example query to find ranking threads
site:reddit.com/r/PostgreSQL "backup" OR "replication" "recommend"
```
- Focus on threads that are **not archived** (less than 6 months old) and rank in Google positions 1-5.
- These threads receive consistent organic search impressions daily from real prospective buyers.

### Step 2: Automated Subreddit Monitoring via Python (`praw`)
Monitor new incoming discussions in real time:
```python
import praw

reddit = praw.Reddit(
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_CLIENT_SECRET",
    user_agent="script:tech-monitor:v1.0 (by /u/your_username)"
)

subreddit = reddit.subreddit("devops+PostgreSQL+sysadmin")
keywords = ["database backup", "wal archiving", "disaster recovery"]

for submission in subreddit.stream.submissions(skip_existing=True):
    title_and_text = f"{submission.title} {submission.selftext}".lower()
    if any(k in title_and_text for k in keywords):
        print(f"ALERT: Relevant discussion on r/{submission.subreddit.display_name}")
        print(f"Title: {submission.title}")
        print(f"URL: {submission.url}\n")
```

### Step 3: Check Subreddit Rules & Wiki
Before commenting:
1. Read the subreddit sidebar rules (e.g., Rule 4: "No Self-Promotion", or "Promotions only allowed in monthly showcase thread").
2. Check if the subreddit allows commercial vendor representatives if transparently disclosed.
3. Comply strictly with all moderator guidelines.

### Step 4: The 4-Part "Engineer-to-Engineer" Comment Anatomy
Format your response with deep technical rigor:
1. **Acknowledge the Exact Bottleneck**: Validate the original poster’s specific configuration challenge.
2. **Provide the Direct Solution in Plain Text**: Give the exact Bash script, SQL query, or architecture configuration directly inside the Reddit comment (do not force them to click a link to read the answer).
3. **Explain the Trade-Offs**: Detail edge cases, bandwidth costs, or storage limits.
4. **Contextual Resource Link (with Transparent Disclosure)**:
   ```markdown
   ...If you want to automate this, here's the open-source script we built for continuous WAL streaming: [link]. 
   
   *(Disclaimer: I'm an engineer at DevCenterPoint, we maintain this free tool).*
   ```

### Step 5: Post-Submission Engagement
1. Monitor the thread for replies.
2. Answer follow-up questions promptly with additional technical clarification.
3. Upvoted, insightful responses remain at the top of the comment thread permanently, capturing clicks from both searchers and LLM web crawlers.

## H. Analysis and Decision Framework
Use this framework to qualify Reddit participation:

```
                  [Relevant Reddit Thread Identified]
                                  |
              Is the thread asking for tool recommendations
                     or troubleshooting a problem?
                             /          \
                          [Yes]         [No]
                           /              \
             Can you answer the question  (Discard: Irrelevant
             thoroughly in the comment?    or general banter)
                    /          \
                 [Yes]         [No]
                  /              \
         (Post thorough answer    (DO NOT COMMENT: Never drop
          with transparent         a bare link without an
          source disclosure)       in-depth written answer)
```

## I. Prioritization Framework
Score Reddit opportunities using the **Thread Gravity Score (TGS)**:

$$\text{TGS} = \text{Google Ranking Position of Thread (1-10)} \times \text{Subreddit Subscriber Count} \times \text{Upvote Ratio}$$

Prioritize threads that currently rank in Google Top 3 for high-volume commercial queries.

## J. Deliverables & Specifications
Deliver a **Reddit Community Authority Ledger**:
1. `thread_url`: The Reddit post URL.
2. `google_ranking_query`: The search query where this thread ranks on page 1.
3. `subreddit_name`: Target community.
4. `posted_comment_text`: Full markdown text of the response.
5. `transparency_disclaimer_included`: Boolean (True/False).
6. `comment_score_upvotes`: Measured net karma.
7. `ai_citation_status`: Whether answer engines cite this thread.

## K. Quality Assurance Checklist
- [ ] Comment provides a complete, actionable answer inside Reddit without requiring a link click.
- [ ] Corporate affiliation is explicitly disclosed in the comment.
- [ ] No tracking affiliate parameters (`?utm_...`) included in the link (use clean canonical links).
- [ ] Subreddit sidebar rules on self-promotion were reviewed and respected.
- [ ] Account has a history of organic, non-promotional participation across multiple subreddits.

## L. Failure Modes and Anti-Patterns
- **The "Sock-Puppet" Astroturfing Disaster**: Creating a fake account to ask "What's the best database backup tool?" and replying with another fake account "I love DevCenterPoint!". Reddit communities detect this within minutes, post screenshots, and permanently disgrace the brand.
- **The Drive-By Link Drop**: Posting `Check out our tool: https://example.com` on a serious technical thread. Instant ban and domain block.
- **Arguing with Community Members**: Engaging in defensive flame wars with critical commenters, creating permanent negative search results associated with the brand name.

## M. AI-Agent Operating Instructions
1. An AI agent must NEVER post directly to Reddit automatically via unattended bot accounts. All community responses must pass through human developer relations / engineering review.
2. AI agents should be used strictly to **monitor keywords, summarize technical questions, and draft initial solution outlines**.
3. Always mandate transparent affiliation disclosure blocks in any generated comment proposal.

## N. Success Metrics & Verification Windows
- **Community Karma & Position**: Comment achieves $\ge +10$ net upvotes and ranks among the top 3 comments in the thread.
- **LLM Grounding**: Generative engines cite the Reddit thread and mention your brand recommendation within 30 days of thread indexing.

## O. Related Skills
- **Upstream Input**: [Low-competition Keywords](../../Keyword%20Research/Low-competition%20Keywords/SKILL.md)
- **AI Search Monitoring**: [AI Search Visibility](../AI%20Search%20Visibility/SKILL.md), [AI Citations](../AI%20Citations/SKILL.md)
- **Third-Party Footprint**: [3rd Party Mentions](../3rd%20Party%20Mentions/SKILL.md)

## P. Authoritative References
- [Reddit Developer Terms & API Rules](https://www.reddit.com/dev/api/) — Official terms governing data retrieval and automated account interactions.
- [Reddit Content Policy and Guidelines for Self-Promotion](https://www.reddithelp.com/hc/en-us/articles/360043504051-What-constitutes-spam-Am-I-a-spammer) — The official 90/10 community contribution standard.

## Q. Maintenance and Review Cycle
- **Weekly Thread Re-check**: Revisit the top 10 highest-traffic ranking Reddit threads monthly to answer new replies and ensure recommendations remain accurate.
