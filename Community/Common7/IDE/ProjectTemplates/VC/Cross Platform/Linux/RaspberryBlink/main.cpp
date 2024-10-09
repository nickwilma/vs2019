#include <wiringPi.h>

// $TemplateToken_LED_Desc01$
// $TemplateToken_LED_Desc02$
// $TemplateToken_LED_Desc03$
// $TemplateToken_LED_Desc04$
// $TemplateToken_LED_Desc05$
#define	LED	17

int main(void)
{
	wiringPiSetupSys();

	pinMode(LED, OUTPUT);

	while (true)
	{
		digitalWrite(LED, HIGH);  // $TemplateToken_On$
		delay(500); // $TemplateToken_ms$
		digitalWrite(LED, LOW);	  // $TemplateToken_Off$
		delay(500);
	}
	return 0;
}