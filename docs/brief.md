# Lazo Clinic — Product Brief

Status: draft v0.2 · 2026-10-18 · built from context-dump rounds 1–3

## Context

A web app for a solo pediatrician's private clinic in Vigan, Ilocos Sur, Philippines. The doctor also does hospital rounds. The project started as a request to **digitize cabinets of paper patient records**. Queue visibility and payment tracking came up later as problems worth solving too.

Long term, it might be white-labelled for other solo-doctor clinics in the area. That is not a goal right now. The only thing it affects today is the data model (see Architecture direction).

## Users

| Role | Who | Devices today | Notes |
|---|---|---|---|
| Doctor | Pediatrician, clinic owner | Phone, mobile data | Often away on hospital rounds; arrival time varies |
| Secretary (main) | Runs front desk, manages queue | Phone | Texts the doctor the queue count today |
| Secretary (backup) | Covers leave | Phone | Needs the same access as the main secretary, without a handover |
| Guardian / parent | Brings the child in | Phone (SMS, Messenger, web) | All income levels and all tech-literacy levels |
| Patient | The child | — | Never a direct user |

The clinic currently has **no computers and no fixed internet**. The doctor is open to getting internet installed.

## Problems, in priority order

1. **Paper records.** Hundreds of patients, each with many visits. A file holds standard measurements, visit notes, prescriptions and more. Pulling a file is mostly about seeing patient history.
2. **Payment tracking.** Mostly cash. The doctor had BIR issues and had a bookkeeper. She needs clean payment records that hold up for tax purposes.
3. **Queue visibility.** Walk-ins only, no appointments. Wait times are long, and an app can't fix the doctor's schedule. What it can do is make the queue visible: the doctor sees the count without being texted, and guardians see their position and the doctor's status, so they can wait elsewhere.

## Scope

| Area | Phase | Notes |
|---|---|---|
| Patient records + guardians | **v1** | The problem the doctor actually asked us to solve |
| Visit records (measurements, notes, prescriptions) | **v1** | Structured fields, grown over time |
| Scanned paper files attached to patients | **v1** | Phone-camera capture, compressed before upload |
| Patient search (name, birthdate, guardian) | **v1** | |
| Staff accounts (doctor, secretaries) | **v1** | |
| Queue: secretary-managed, doctor sees the count | v2 | Small feature; replaces the texting |
| Queue: guardian-facing position + doctor status | v2 | Via SMS or a web link |
| Payment tracker + export for the bookkeeper | v2 | **Does not issue receipts or invoices** (see open questions) |
| Admission / referral noted on a visit | v1 or v2 | e.g. "admitted to X hospital" |
| Appointments / booking | not planned | Doesn't match how the clinic runs |
| Multi-clinic / white-label | later | Prepared for in the data model only |

The data covered will grow: "comprehensive" is the goal, and new needs will surface as the doctor uses the app.

## Domain notes

- **Pediatric.** The patient is the child. Guardians are a separate entity: one guardian can have several children, and a child can have several guardians.
- **One patient, many visits.** Each visit holds measurements, notes and prescriptions, and possibly what happened next (sent home, referred, admitted).
- **Scans next to structured data.** Turning old handwriting into structured fields automatically is unreliable. Old records stay as scans attached to the patient (and optionally to a visit). Structured data starts from digitization onward.

## Constraints

- **Law:** the Data Privacy Act of 2012 (RA 10173) and National Privacy Commission rules. Health data is *sensitive personal information*. See [privacy-plan](./privacy-plan.md) (to be written).
- **Fake data only** during development. A plan for handling real data must exist and be followed before any real patient data enters the system.
- **Devices:** responsive on mobile, tablet and desktop. Must run well on low-end Android phones.
- **Data use:** minimal page weight and JavaScript, and images compressed before upload, because people are on prepaid mobile data.
- **Running costs** are paid by the doctor, so keep them minimal. Development tooling can cost money.

## Product principles

1. **Usable by non-technical people.** Big targets, plain language (English, and maybe Ilocano/Filipino later), few steps.
2. **Accessible.** WCAG 2.2 AA as the baseline.
3. **Light.** Fast on cheap phones, cheap on data.
4. **Fits how the clinic already works.** Walk-ins, a secretary-run front desk, a doctor who is often away. Don't force a new workflow on them.

## Architecture direction

- **Modular monolith.** One Next.js app and one database. Feature modules (`records`, `queue`, `payments`) have clear boundaries.
- **Tenant-ready.** Every clinic-owned record carries a `clinic_id` from day one.
- **Test-driven.** Tests come before code, at the unit, component and end-to-end levels.
- **CI/CD.** Checks on every PR; eventually, scheduled deployments.

## Open questions

Questions that need the doctor or a secretary (good for a short interview):

- [ ] When she pulls a file, what is she looking for, exactly? Last visit, vaccine history, growth over time, allergies?
- [ ] Which measurements are recorded at every visit? (Weight, height, head circumference, temperature, …?)
- [ ] Is there a standard format for prescriptions? Does she need to print them?
- [ ] How does she record admissions or referrals today, if at all?
- [ ] How is a visit fee decided, and does it vary?
- [ ] What are the secretary's exact steps when a patient walks in?
- [ ] Would guardians use a "check your queue position" link? Over SMS or Messenger?

Questions for the bookkeeper or accountant:

- [ ] What caused the BIR issue: missing receipts, mismatched records, filing?
- [ ] What format do they need payment data in?
- [ ] Does recording payments in an app (without issuing receipts) raise any BIR registration requirement?

Questions for us:

- [ ] Hosting provider, region and backup strategy. Deferred to its own session, before real data. Direction: cheap and simple now, able to grow later; AWS is the leading candidate.
- [ ] Chain of custody for paper files scanned off-site at home (see Decisions).

## Decisions

See [decisions.md](./decisions.md).
