# [Security by Design: 7 Application Security Principles You Need to Know](https://www.cprime.com/resources/blog/security-by-design-7-principles-you-need-to-know/)

The explosion of high-quality application development frameworks has been a boon to the world’s software. It’s easier than ever to put together an application and start delivering value for customers, who can come from anywhere in the world. Unfortunately, the same is true for hackers coming to attack your application. As the world’s software grows more connected, and contains more valuable data, hackers have grown more sophisticated. They’re no longer kids in someone’s basement. Today’s hackers command massive botnets and receive sponsorship from hostile nation-states. Networked application security needs to be able to stand up to hundreds of hours of CPU time and committed adversaries.

Here’s the bad news: it’s impossible to write perfectly secure applications. Bugs are going to slip through, and if they do, attackers will find them. But that’s the bad news. The good news is that you can design your applications to minimize the damage those bugs cause. The even better news is that designing secure applications isn’t complicated or mysterious. The key is to follow a few key principles during the application design phase. This way, even when bugs rear their ugly heads, the damage they cause doesn’t lead to attackers obtaining all your valuable data, or the entire service going down.
[![application security](https://www.cprime.com/wp-content/uploads/2019/12/coral_security.png)](https://www.cprime.com/wp-content/uploads/2019/12/coral_security.png)
In this post, we’ll talk about key security principles that will work in any kind of application. Following these principles is critical to ensuring that the software you ship is safe and secure for your customers.

## 1. Principle of Least Privilege

The first principle for secure design is the [Principle of Least Privilege](https://digitalguardian.com/blog/what-principle-least-privilege-polp-best-practice-information-security-and-compliance). The Principle of Least Privilege means that you ensure people only have enough access that they need to do their job. For instance: if you design a system which holds sensitive customer financial information, it’s good practice to limit who can access that information. The person who answers the phone and schedules meetings probably doesn’t need access to all of the sensitive information. On the other hand, an account manager probably does need access to that information. The key is ensure that account manager doesn’t have access to information from accounts they don’t manage.

By ensuring that accounts have only the privileges necessary to do their job, you ensure that if an attacker compromises an account, you minimize what information they can access. This limits the damage of the attack.

## 2. Principle of Separation of Duties

The [Principle of Separation of Duties](https://www.csoonline.com/article/2123120/separation-of-duties-and-it-security.html) follows on from the Principle of Least Privilege. The idea behind Separation of Duties is that no single role should have too much authority. This is different from the concept of Least Privilege. While that focuses on making sure that people only have the privileges they need to do their job, this is about making sure their job isn’t too big. When someone does a job that’s too big, we fall right back to the point where they’ll need lots of permissions to do that job. Also, when someone has many duties in their job, it means that they’re susceptible to making poor decisions.

In our hypothetical financial system from before, we wouldn’t want the person who’s responsible for making sales also able to approve discounts. That person would have an incentive to discount the software, and might make poor decisions about discounts in order to boost their sales numbers. Instead, someone else, like a manager, should need to approve a discount before the sale finishes.

## 3. Principle of Defense in Depth

The [Defense in Depth Principle](https://www.owasp.org/index.php/Defense_in_depth) is a bit different from preceding principles. While Least Privilege and Separation of Duties think about how people gain access to the system, Defense in Depth is about preventing access to the [system](https://www.cprime.com/resources/blog/system-monitoring-age-of-site-reliability-engineering/). The basic expectation with Defense in Depth is that any security system you put in place is going to fail. It might be [very difficult](https://xkcd.com/538/) to circumvent computer security systems, but it’s always possible.

Designing with Defense in Depth means setting up systems which will tell you when your designated security fails. For instance, many servers for software systems use security software, but are collocated in a single building. Someone who broke into that building would have physical access to each of the servers. Suddenly, that fancy firewall or intrusion detection software is worthless. This is why [data centers](https://www.cprime.com/resource/webinars/getting-one-step-ahead-of-your-competition-with-atlassian-jira-data-center/) are designed with physical security present and security cameras to detect intruders. The world’s best firewall won’t help even a little if you forget to put a $5 lock on the outside door to your data center.

## 4. Principle of Failing Securely

Much like with Defense in Depth, the [Principle of Failing Securely](https://www.owasp.org/index.php/Fail_securely) recognizes that things are going to fail. To imagine how a system can Fail Securely, imagine a digital locking mechanism. Perhaps you need a security badge to access sensitive areas of a building. Following the principle of Least Privilege, your security badge only grants access to areas you need to do your job. What happens if the power goes out?

In a system that “fails open” all the locks stop working. Suddenly, you have access to every door in the building! If you’re the malicious sort, now’s the time to go snooping. In a system that instead Fails Securely, all of the doors lock. Instead of granting access to all of the doors in the building, you don’t have access to any of them. No snooping for you, today!

The same concept applies to software design. A system that’s designed to Fail Securely only grants access to parts of the system when every step of the process completes successfully.

## 5. Principle of Open Design

The Principle of Open Design says that your system security shouldn’t rely on the secrecy of your implementation. This is a particularly important principle for security concepts like cryptographic implementations. Well-designed cryptography implementations are published publicly. They’re interrogated by the smartest people in the world before they’re put into practice.

The same should be true for any software system. For instance, a system which doesn’t Fail Securely, like before, might rely on the idea that “nobody would ever figure that out.” While it’s unlikely that an attacker might deduce that a bug grants access to the system, it’s not impossible. What’s more, if they ever gained access to your source code, they’d figure it out quickly. Instead, follow the principles for secure design to ensure the system is safe, no matter whether someone malicious gains access to your code.

## 6. Principle of Avoiding Security by Obscurity

[Security by Obscurity](https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/part2/security-through-obscurity.html) is similar to the principle of Open Design. Imagine software which has a hard-coded secret username and password combination. When authenticated, this account has full access to every account in the system. The [security](https://www.cprime.com/resource/white-papers/devsecops-playbook/) of this system relies on the credentials of this account remaining a secret. Over time, a growing number of users will gain access to this account. Some will leave the company, but they won’t forget the password. At that point, the security of your application relies on the good will of those employees.

It’s true that every application’s security relies on secrets. Passwords are a critical part of most authentication schemes. There’s nothing that you can do about that. However, a better design for this system is one where the account with full access doesn’t exist in the first place. If you must include it, don’t hard-code the credentials. Instead, make the account a normal account. When someone with access to the account leaves the company, change the password.

## 7. Principle of Minimizing Attack Surface Area

The [Principle of Minimizing Attack Surface Area](https://www.owasp.org/index.php/Minimize_attack_surface_area) is all about removing parts of an application to make it more secure. The classic example doesn’t come from software, but from thinking about our imaginary data center again. If you’ve ever visited a data center, you likely noticed they don’t have a lot of windows. Part of this is to benefit cooling the building. But part of the reason data centers aren’t encased in windows is windows are easy to break. You might have the absolute best locks in the business, but they don’t do any good if someone comes in through the window.

Parts of your application are like windows. They look nice, but they might expose functionality that leads to bugs. Minimizing Attack Surface Area questions whether a feature is necessary. Sometimes, by redesigning a feature to make it more simple, the [application’s overall security improves.](https://www.cprime.com/resources/blog/protecting-your-atlassian-tools-ecosystem-investment-part-5-best-practices-for-add-ons-and-health-monitoring/)



https://www.cprime.com/resources/blog/security-by-design-7-principles-you-need-to-know/