package hello;

import org.joda.time.LocalTime;

/**
 *
 * We cannot travel around the world yet, so we say hello home.
 *
 */
public class HelloHome {

	public static void main(String[] args){
		LocalTime currentTime = new LocalTime();
		Greeter greeter = new Greeter();
		System.out.println(greeter.sayHello() + " @ " + currentTime);
	}
}
