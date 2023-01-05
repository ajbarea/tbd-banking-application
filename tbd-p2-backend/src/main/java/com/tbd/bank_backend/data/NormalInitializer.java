package com.tbd.bank_backend.data;

import com.github.javafaker.Faker;
import com.tbd.bank_backend.models.*;
import com.tbd.bank_backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Component
public class NormalInitializer implements CommandLineRunner {

	//transactions
	@Autowired
	private TransactionStatusRepository statRepo;

	@Autowired
	private TransactionTypeRepository tTypeRepo;

	@Autowired
	private TransactionRepository transactionRepo;

	//accounts
	@Autowired
	private AccountTypeRepository aTypeRepo;

	@Autowired
	private AccountRepository accountRepo;

	//requests
	@Autowired
	private RequestStatusRepository requestStatusRepo;

	//notifications
	@Autowired
	private NotificationStatusRepository notificationStatusRep;

	//user
	@Autowired
	private UserRepository userRepo;

	//utils
	@Autowired
	private Faker faker;

	@Autowired
	private PasswordEncoder encoder;


	@Override
	public void run(String... args) throws Exception {

		//create list of default types to add to db
		List<TransactionType> types = new ArrayList<>();
		types.add(new TransactionType(1, "Debit"));
		types.add(new TransactionType(2, "Credit"));
		types.add(new TransactionType(3, "Check"));
		types.add(new TransactionType(4, "Paypal"));
		types.add(new TransactionType(5, "Other"));

		tTypeRepo.saveAll(types);

		//create list of default statuses
		List<TransactionStatus> statuses = new ArrayList<>();
		statuses.add(new TransactionStatus(1, "Pending"));
		statuses.add(new TransactionStatus(2, "Complete"));

		statRepo.saveAll(statuses);

		//create list of default account types
		List<AccountType> atypes = new ArrayList<>();
		atypes.add(new AccountType(1, "Checking"));
		atypes.add(new AccountType(2, "Savings"));

		aTypeRepo.saveAll(atypes);

		//create list of default Request statuses.
		List<RequestStatus> requestStatuses = new ArrayList<>();
		requestStatuses.add(new RequestStatus(1, "PENDING"));
		requestStatuses.add(new RequestStatus(2, "ACCEPTED"));

		requestStatusRepo.saveAll(requestStatuses);

		//create list of default Notification statuses
		List<NotificationStatus> notificationStatuses = new ArrayList<>();
		notificationStatuses.add(new NotificationStatus(1, "UNREAD"));
		notificationStatuses.add(new NotificationStatus(2, "READ"));

		notificationStatusRep.saveAll(notificationStatuses);

		//auto-generating fake users
		List<User> users = IntStream.rangeClosed(1, 20)
				.mapToObj(i -> new User(this.faker.name()
						.username(), this.faker.internet()
						.emailAddress(), this.faker.name()
						.firstName(), this.faker.name()
						.lastName(), encoder.encode("password")))
				.toList();

		userRepo.saveAll(users);

		//auto generate accounts for each user
		users.forEach(user -> {
			List<Account> accounts = IntStream.rangeClosed(1, 2)
					.mapToObj(i -> new Account(null, this.faker.funnyName()
							.name(), user, faker.number()
							.randomDouble(2, 0, 10000), new AccountType(this.faker.number()
							.numberBetween(1, 2), null)))
					.toList();
			accountRepo.saveAll(accounts);


			//auto generate transactions for each account
			accounts.forEach(account -> {
				List<Transaction> transactions = IntStream.rangeClosed(1, 100)
						.mapToObj(i -> new Transaction(0, account, this.faker.number()
								.randomDouble(2, -3000, 3000), new TransactionType(this.faker.number()
								.numberBetween(1, 5), null), new TransactionStatus(2, null), "Food",
								this.faker.hitchhikersGuideToTheGalaxy()
										.specie(), this.faker.date()
								.between(Date.from(Instant.ofEpochMilli(1000)), Date.from(Instant.now()))
								.toInstant()
								.atZone(ZoneId.systemDefault())
								.toLocalDate(), this.faker.hobbit()
								.character()))
						.toList();

				transactionRepo.saveAll(transactions);

			});
		});
	}
}
