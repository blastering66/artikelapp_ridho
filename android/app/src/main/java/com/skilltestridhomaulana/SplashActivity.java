package com.skilltestridhomaulana;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.content.SharedPreferences;
import android.widget.Toast;

public class SplashActivity extends AppCompatActivity {
  @Override
  public void onNewIntent(Intent intent) {
      setIntent(intent);
  }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
     @Override
     protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);

         // SharedPreferences spf = getSharedPreferences("cheers_spf" , MODE_PRIVATE);
         // String authToken = spf.getString("spf_authtoken", "");
         // Toast.makeText(getApplicationContext(), authToken, Toast.LENGTH_LONG ).show();

         Intent intent = new Intent(this, MainActivity.class);
         intent.putExtra(this.getIntent());
         startActivity(intent);
         finish();

     }
}
