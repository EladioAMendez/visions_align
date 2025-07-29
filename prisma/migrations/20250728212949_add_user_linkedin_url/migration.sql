-- AlterTable
ALTER TABLE "stakeholders" ADD COLUMN     "department" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "influence" TEXT NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "relationship" TEXT NOT NULL DEFAULT 'NEUTRAL',
ADD COLUMN     "role" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "linkedin_url" TEXT;
