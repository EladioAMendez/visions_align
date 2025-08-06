-- CreateEnum
CREATE TYPE "public"."PlaybookType" AS ENUM ('STAKEHOLDER_ANALYSIS', 'GOAL_ORIENTED', 'RELATIONSHIP_ANALYSIS');

-- CreateEnum
CREATE TYPE "public"."MeetingGoal" AS ENUM ('PROJECT_UPDATE', 'BUDGET_ASK', 'NEW_IDEA_PITCH', 'PERFORMANCE_REVIEW', 'STRATEGIC_ALIGNMENT', 'PROBLEM_SOLVING', 'STAKEHOLDER_ALIGNMENT');

-- AlterTable
ALTER TABLE "public"."playbooks" ADD COLUMN     "meeting_goal" "public"."MeetingGoal",
ADD COLUMN     "playbook_type" "public"."PlaybookType" NOT NULL DEFAULT 'STAKEHOLDER_ANALYSIS';
